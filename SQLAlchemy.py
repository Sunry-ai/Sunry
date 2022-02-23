from tokenize import ContStr, Intnumber
from sqlalchemy import Column, Integer, String,Float, func
from sqlalchemy import inspect
from sqlalchemy import inspect

import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


# 初始化数据库连接:
DATABASE = 'postgresql'
USER = 'postgres'
PASSWORD = 'postgres'
HOST = 'localhost'
PORT = '5432'
DB_NAME = 'sun_db'

CONNECT_STR = '{}://{}:{}@{}:{}/{}'.format(DATABASE, USER, PASSWORD, HOST, PORT, DB_NAME)
print(CONNECT_STR)
# 初始化数据库连接:
engine = create_engine(CONNECT_STR,echo=True)  



class RepresentableBase(object):
    def __repr__(self):
        """Dump all columns and value automagically.
        """             
        #: Columns.
        columns = ', '.join([
            '{0}={1}'.format(k, repr(self.__dict__[k]))
            for k in self.__dict__.keys() if k[0] != '_'
        ])
        
        return '<{0}({1})>'.format(
            self.__class__.__name__, columns
        )

Base = declarative_base(cls=RepresentableBase)

class User(Base):
    __tablename__ = 'users' # 表的名字

    # 定义各字段
    id = Column(Integer, primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)


class InInfo(Base):
    # 表的名字:
    __tablename__ = 'intable' #入货表

    # 表的结构:
    inGoodsId = Column(Integer, autoincrement=True, primary_key=True, unique=True, nullable=False)#在fastapi里面写的是str 但是理想状态下是int
    inGoodsNum = Column(Float, nullable=False,comment='货物数量')
    inGoodsName = Column(String(30), nullable=False,comment='货物名称')
    inGoodsPrice = Column(Float, nullable=False,comment='货物入货价格')
    inFrom = Column(String(10), nullable=False,comment='入货交易人')
    inGoodsFee = Column(Float(8), nullable=False,comment='货物入货所有的费用')
    WareHouse = Column(String(20), nullable=False,comment='货物对应仓库')
    state = Column(String(4), nullable=False,default='in',comment='货物是否出货')
    inTime = Column(String(20), nullable=False, default=time.strftime("%Y-%m-%d", time.localtime()),comment='货物入货时间')
    profitRatio: Column(Integer, nullable=False,comment='货物利润占比')
    Partner: Column(String(30), nullable=False,comment='货物合伙人')

class OutInfo(Base):
    # 表的名字:
    __tablename__ = 'outtable' #出货表

    # 表的结构:
    goodsId = Column(Integer, autoincrement=True, primary_key=True, unique=True, nullable=False)
    outGoodsNum = Column(Float, nullable=False,comment='出货数量')
    outGoodsPrice = Column(Float, nullable=False,comment='出货价格')
    outBuyFrom = Column(String(10), nullable=False,comment='出货交易人')
    outGoodsFee = Column(Float, nullable=False,comment='出货所有的费用')
    outTime = Column(String(20), nullable=False, default=time.strftime("%Y-%m-%d", time.localtime()),comment='货物出货时间')

class WareHouse(Base):
    # 表的名字:
    __tablename__ = 'warehouse' 

    goodsId = Column(Integer, autoincrement=True, primary_key=True, unique=True, nullable=False)
    ingoodsNum =  Column(Float, nullable=False,comment='出货数量')
    outgoodsNum =  Column(Float, nullable=False,comment='进货数量')
    goodsFee = Column(Float, nullable=False,comment='费用')
    WareHouse = Column(String(20), nullable=False,comment='货物仓库')
    goodsProfit = Column(Float, nullable=False,comment='货物利润')

class Profit(Base):
    # 表的名字:
    __tablename__ = 'profit' 

    goodsId = Column(Integer, autoincrement=True, primary_key=True, unique=True, nullable=False)
    goodsName = Column(String(30), nullable=False,comment='货物名称')
    outGoodsNum = Column(Float, nullable=False,comment='出货数量')
    goodsProfit = Column(Float, nullable=False,comment='货物利润')

class BuyFrom(Base):
    # 表的名字:
    __tablename__ = 'buyfrom' 

    person=Column(String(30), nullable=False,unique=True,primary_key=True)

class Partner(Base):
    # 表的名字:
    __tablename__ = 'partner' 

    person=Column(String(30), nullable=False,unique=True,primary_key=True)


Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

#------交易人--------- ok
def get_buyfrom():
    session = Session()
    person_lst=session.query(BuyFrom.person).all()
    name_lst=[]
    for k in person_lst:
        name_lst.append(str(k.person))
    print(name_lst)
    return name_lst

def post_buyfrom(nameinfo):
    session = Session()
    # 添加到session:
    session.add(nameinfo)
    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()
#--------------------------
def get_partner():
    session = Session()
    person_lst=session.query(Partner.person).all()
    name_lst=[]
    for k in person_lst:
        name_lst.append(str(k.person))
    print(name_lst)
    return name_lst

def post_partner(nameinfo):
    session = Session()
    # 添加到session:
    session.add(nameinfo)
    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()
#--------查询id---------------ok
def get_id():
    session = Session()
    id_num=session.query(func.count(InInfo.goodsId)).scalar()
    return id_num+1


#添加入货信息------------------------ok
def insertInData(new_good): #ok

    session = Session()
    # 添加到session:
    session.add(new_good)

    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()

#更新入货消息-------------------------
def updateInData(update_good,id):
    print(id)
    session = Session()
    # 添加到session:
    entity=session.query(InInfo).filter(InInfo.goodsId==id).first()
    columns = [m.key for m in InInfo.__table__.columns]
    for column in columns:
        entity.__setattr__(column,getattr(update_good,column))
    
    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()

def updateOutInfo(id):
    session = Session()
    session.query(InInfo).filter(InInfo.goodsId==id).update({InInfo.outInfo:'yes'})
    session.commit()

#添加出货信息------------------------
def insertOutData(new_good):
    session = Session()
    # 添加到session:
    session.add(new_good)
    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()

#更新出货消息-------------------------
def updateOutData(update_good,id):
    print(id)
    session = Session()
    # 添加到session:
    entity=session.query(OutInfo).filter(OutInfo.goodsId==id).first()
    columns = [m.key for m in OutInfo.__table__.columns]
    for column in columns:
        entity.__setattr__(column,getattr(update_good,column))
    
    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()


def get_goodsinfo(goodsid):
    session = Session()
    # 添加到session:
    data=session.query(OutInfo).filter(OutInfo.goodsId==goodsid).all()
    return data

#计算利润-------------------------
def calProfit(id):
    session = Session()
    #计算利润---------
    inFee= session.query(InInfo.inGoodsFee).filter(InInfo.goodsId==int(id)).all()
    outFee=session.query(OutInfo.outGoodsFee).filter(OutInfo.goodsId==int(id)).all()
    inPrice= session.query(InInfo.inGoodsPrice).filter(InInfo.goodsId==int(id)).all()
    outPrice= session.query(OutInfo.outGoodsPrice).filter(OutInfo.goodsId==int(id)).all()
    innum=session.query(InInfo.goodsNum).filter(InInfo.goodsId==int(id)).all()
    outnum=session.query(OutInfo.outGoodsNum).filter(OutInfo.goodsId==int(id)).all()

    profit=((outPrice-inPrice)*outnum)-(outFee+((inFee/innum)*outnum))
    print('result:'+profit)
    #---------------

    #写入表单--------
    GoodsName= session.query(InInfo.goodsName).filter(InInfo.goodsId==int(id)).all()
    GoodsNum= session.query(OutInfo.outGoodsNum).filter(OutInfo.goodsId==int(id)).all()
    new_good = Profit(goodsId=id , goodsName=GoodsName,outGoodsNum=GoodsNum,
                       goodsProfit= profit )
    # 添加到session:
    session.add(new_good)

    # 提交即保存到数据库:
    session.commit()
    # 关闭session:
    session.close()
#-----------------------------------

# #仓库表单----------------------------
def getwareHouse(warehouse_name):
    session = Session()

    cost = session.query(func.sum(WareHouse.goodsFee)).filter(WareHouse.WareHouse==warehouse_name).scalar()
    profit = session.query(func.sum(WareHouse.goodsProfit)).filter(WareHouse.WareHouse==warehouse_name).scalar()
    innum = session.query(func.sum(WareHouse.ingoodsNum)).filter(WareHouse.WareHouse==warehouse_name).scalar()
    outnum = session.query(func.sum(WareHouse.outgoodsNum)).filter(WareHouse.WareHouse==warehouse_name).scalar()


#-----------------------------------

#查询数据----------------------------
#--查询数据---
def search_by_person(name):

    session = Session()
    # 添加到session:
    data=session.query(InInfo).filter(InInfo.inBuyFrom.like('%{0}%'.format(name))).all()
    return data

def search_by_goods(goods):

    session = Session()
    # 添加到session:
    data=session.query(InInfo).filter(InInfo.goodsName.like('%{0}%'.format(goods))).all()
    return data

def search_by_time(intime):

    session = Session()
    # 添加到session:
    data=session.query(InInfo).filter(InInfo.inTime==intime).all()
    return data
#--查询利润---

#--查询仓库---

