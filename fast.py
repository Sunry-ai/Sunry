from ast import In
from json import tool
from typing import Optional
from datetime import datetime,date

from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from fastapi import FastAPI
from pydantic import BaseModel

from fastapi import Depends, FastAPI, HTTPException

from sqlalchemy.orm import Session

import SQLAlchemy
from SQLAlchemy import  engine

SQLAlchemy.Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    
)

warenames = ['大连欧亚仓库', '大连外贸库', '中革二库', '羊圈子咯咯香库', '大队库']

#home------------------------------ok
class LatesNameMessage(BaseModel):
    LatesNameMessage:str

class latestPartner(BaseModel):
    latestPartner:str

#=---------------------------------

class InInfo(BaseModel):
    inGoodsId: str  # 货物的id
    # inGoodsName: str  # 货物名称
    # inGoodsNum: str  # 货物数量
    # inGoodsPrice: str  # 货物入货价格
    # inFrom: str  # 货物入货交易人
    # inGoodsFee: str  # 货物入货所有的费用——运费，加工费等
    # inTime:  Optional[date] = Body(None) # 货物入货时间
    # WareHouse: str # 货物对应仓库
    # goodsState: str  # 货物是否出货 是-yes 否-no
    # profitRatio: int
    # Partner: str



class OutInfo(BaseModel):
    # -------------Out-----------------------
    WareHouse: str
    goodsId:int
    goodsName: str
    goodsNum: float
    inBuyFrom: str
    inGoodsFee: float
    inGoodsPrice: float
    inTime: str
    outBuyFrom: str
    outGoodsFee: str
    outGoodsNum: str
    outGoodsPrice: str
    outInfo: str
    outTime: str

class OutEdit(BaseModel):
    # -------------Out-----------------------
    goodsId:str
    outBuyFrom: str
    outGoodsFee: str
    outGoodsNum: str
    outGoodsPrice: str
    outTime: str

class HostInfo(BaseModel):
    goodsNum: float
    hostCost: float

class Profit(BaseModel):
    inGoodsNum: float  # 进货总数量
    outGoodsNum: float  # 出货总数量
    totalCost: float  # 总费用+成本
    totalProfit: float  # 总利润



class GoodsName(BaseModel):
    GoodsName:str

class Person(BaseModel):
    Person:str

class searchTime(BaseModel):
    searchTime: str

class TimePeriodBegin(BaseModel):
    TimePeriodBegin: str

class TimePeriodOver(BaseModel):
    TimePeriodOver: str

class Data(BaseModel):
    Data: dict

class GoodsID(BaseModel):
    GoodsID: str

class UpdateOutInfo(BaseModel):
    UpdateOutInfo: str

# -----------添加交易人--------------ok

@app.get("/getbuyfrom")
def get_namelist():
    names=SQLAlchemy.get_buyfrom()
    return names


@app.post("/makebuyfrom")
async def create_name(latestNameMessage: LatesNameMessage):
    person=latestNameMessage.LatesNameMessage
    names=SQLAlchemy.get_buyfrom()
    nameinfo=SQLAlchemy.BuyFrom(person=person)
    if latestNameMessage.LatesNameMessage in names:
        print('already have')
    else:
        names.append(latestNameMessage.LatesNameMessage)
        SQLAlchemy.post_buyfrom(nameinfo)
# ----------------------------------
@app.get("/getpartner")
def get_partnerlist():
    names=SQLAlchemy.get_partner()
    return names


@app.post("/makepartner")
async def create_name(latestPartner: latestPartner):
    person=latestPartner.latestPartner
    names=SQLAlchemy.get_partner()
    nameinfo=SQLAlchemy.Partner(person=person)
    if latestPartner.latestPartner in names:
        print('already have')
    else:
        names.append(latestPartner.latestPartner)
        SQLAlchemy.post_partner(nameinfo)
# ---------获取仓库的名字-------------ignore

@app.get('/getwarehousecolumns')
def wareHouseColumns():
    return warenames
# ----------------------------------

# ---------入货消息的储存--------------ok


@app.post("/editgoods")
async def editgoods(item: InInfo):
    print(item)
    goodsNum= float(item.inGoodsNum)
    goodsFee= float(item.inGoodsFee)
    goodsPrice= float(item.inGoodsPrice)
    goodsId= int(item.inGoodsId)
    goodsinfo=SQLAlchemy.InInfo(inGoodsId= goodsId , inFrom=item.inFrom, inGoodsFee= goodsFee, inGoodsName=item.inGoodsName, inGoodsNum = goodsNum, 
             inGoodsPrice=goodsPrice,WareHouse=item.WareHouse, inTime=item.inTime, state=item.goodsState,profitRatio=item.profitRatio, Partner=item.Partner)
    
    SQLAlchemy.insertInData(goodsinfo)

@app.get('/goodsid')
def getid():
    id_num= SQLAlchemy.get_id()
    return id_num

# ----------------------------------ok

# ------------ShipmentSearch 根据交易人/时间/货物内容提取对应的货物信息--------


@app.post("/search/person")
async def searchByPerson(preson: Person):
    print(preson.Person)
    data= SQLAlchemy.search_by_person(preson.Person)
    # print(data)

    return  data


@app.post("/search/time")
async def searchByTime(sertime: searchTime):
    timedata=datetime.strptime(sertime.searchTime,"%Y-%m-%dT%H:%M:%S.%f%z")
    searchtime=timedata.strftime("%Y-%m-%d")
    data= SQLAlchemy.search_by_time(searchtime)
    return data

@app.post("/search/periodtime")
async def searchByTime(beginperiod: TimePeriodBegin,overperiod: TimePeriodOver):
    print('!')
    # overdata=datetime.strptime(periodtime.searchTimeList[0],"%Y-%m-%dT%H:%M:%S.%f%z")
    # searchtime=timedata.strftime("%Y-%m-%d")
    # data= SQLAlchemy.search_by_time(searchtime)
    # return data


@app.post("/search/goods")
async def searchByGoods(goods: GoodsName):
    print(goods.GoodsName)
    data= SQLAlchemy.search_by_goods(goods.GoodsName)

    return  data

# ---------入货消息的储存+编辑入货消息--------------InfoSet:数据集

@app.post("/InfoSet")
async def InfoSet (goodsinfo:InInfo):
    id=int(goodsinfo.goodsId)
    goodsNum= float(goodsinfo.goodsNum)
    goodsFee= float(goodsinfo.inGoodsFee)
    goodsPrice= float(goodsinfo.inGoodsPrice)
    update_good=SQLAlchemy.InInfo(goodsId=id , inBuyFrom=goodsinfo.inBuyFrom, inGoodsFee= goodsFee, goodsName=goodsinfo.goodsName, goodsNum = goodsNum, 
             inGoodsPrice= goodsPrice,WareHouse=goodsinfo.WareHouse, inTime=goodsinfo.inTime, outInfo=goodsinfo.outInfo)
    
    SQLAlchemy.updateInData(update_good,id)

@app.post("/UpdateInfoSet")
async def UpdateOutInfo (outinfoid:UpdateOutInfo):
    outinfoid=int(outinfoid.UpdateOutInfo)
    SQLAlchemy.updateOutInfo(outinfoid)

    
# ---------出货消息的储存--------------InfoSet:数据集

@app.post("/OutSet")
async def OutSet (goodsinfo:OutInfo):
    goodsId=int(goodsinfo.goodsId)
    outgoodsNum=float(goodsinfo.outGoodsNum)
    outgoodsPrice=float(goodsinfo.outGoodsPrice)
    outgoodsFee=float(goodsinfo.outGoodsFee)
    outinfo=SQLAlchemy.OutInfo(goodsId= goodsId , outBuyFrom=goodsinfo.outBuyFrom, outGoodsFee= outgoodsFee,
                                outTime=goodsinfo.outTime, outGoodsNum = outgoodsNum, outGoodsPrice= outgoodsPrice)
    print(outinfo)
    SQLAlchemy.insertOutData(outinfo)

@app.post("/getgoodsinfo")
async def getGoodsInfo (goodsid: GoodsID):
    print(goodsid.GoodsID)
    data= SQLAlchemy.get_goodsinfo(goodsid.GoodsID)

    return  data[0]

# ---------编辑出货消息--------------------------

@app.post("/OutEdit")
async def OutdataEdit(goodsinfo:OutEdit):
    id=int(goodsinfo.goodsId)
    outgoodsNum=float(goodsinfo.outGoodsNum)
    outgoodsPrice=float(goodsinfo.outGoodsPrice)
    outgoodsFee=float(goodsinfo.outGoodsFee)
    update_good=SQLAlchemy.OutInfo(goodsId= id , outBuyFrom=goodsinfo.outBuyFrom, outGoodsFee= outgoodsFee,
                                outTime=goodsinfo.outTime, outGoodsNum = outgoodsNum, outGoodsPrice= outgoodsPrice)
    print(update_good)
    SQLAlchemy.updateOutData(update_good,id)
# --------------------------------------------

# ---------仓库搜索----------------------------
hostdata = {'goodsNum': 10, 'hostCost': 153}

@app.get('/host1')
def searchHost1():
    return hostdata

@app.get('/host1')
async def getHost1():
    data= SQLAlchemy.search_by_goods(goods.GoodsName)
    SQLAlchemy.getwareHouse(warenames[0])
    
    return  data

@app.get('/host2')
def searchHost2():
    return hostdata


@app.get('/host3')
def searchHost3():
    return hostdata


@app.get('/host4')
def searchHost4():
    return hostdata


@app.get('/host5')
def searchHost5():
    return hostdata


@app.get('/hosttotal')
def searchHostTotal():
    return hostdata
# ----------------------------------------

# ------------利润查询-本月/指定月份----------
profitdata={'inGoodsNum': 145, 'outGoodsNum':139, 
            'totalCost': 1250.8  ,'totalProfit': 1800.1}

@app.get('/profit')
def profitsearch():
    return profitdata
# -----------------------------------------
