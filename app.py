from typing import ValuesView
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)
names = ["赵", "钱", "V", "A"]  # 录入更新交易人名单
DICT_data = [{'BuyFrom': '老王', 'Fee': 312, 'GoodsName': 123, 'GoodsNum': 13,
              'GoodsPrice': 'aaa', 'RHTime': '2000-01-21', 'WareHouse': 'undefined', 'CHinfo': 'No'}]
CH_data=[]

# home----------


@app.route('/getbuyfrom', methods=["POST", "GET"])
def postbuyFrom():
    if request.method == "GET":  # 获取buyfrom的名单
        print(".")
        return jsonify(names)
    else:
        print("....")
        name = request.json["name"]["current"]
        names.append(name)
        return jsonify(names)

# EditGoods------------


@app.route('/editgoods', methods=["POST", 'GET'])
def editGoods():
    if request.method == "GET":
        print(DICT_data)
        return jsonify(DICT_data)
    else:
        data = request.json['RH']
        DICT_data.append(data)
        return jsonify(DICT_data)


@app.route('/getwarehousenumcolumns')
def wareHouseNumColumns():
    warenames = ['大连欧亚仓库', '大连外贸库', '中革二库', '羊圈子咯咯香库', '大队库']
    return jsonify(warenames)

# ShipmentSearch--------


@app.route('/search/time', methods=["POST"])
def searchByTime():
    name = request.json["RHTime"]
    time_search = datetime(int(name[0]), int(
        name[2]), int(name[3])).strftime('%Y-%m-%d')
    print(time_search)
    search_data = {
        "2022":
            {'BuyFrom': 'ASD', 'Fee': 382, 'GoodsName': "红豆", 'GoodsNum': 13, 'GoodsPrice': 'aaa',
                'WareHouse': 'undefined', 'RHTime': '2022-01-25', 'CHinfo': 'No', 'id': '001'},
        "2021-01-01":
            {'BuyFrom': 'A发送', 'Fee': 3834, 'GoodsName': "绿豆", 'GoodsNum': 13, 'GoodsPrice': 'aaa',
                'WareHouse': 'undefined', 'RHTime': '2022-01-25', 'CHinfo': 'No', 'id': '002'}
    }
    # 注意！！这边是第几周 所以需要筛选周以内的所有数据！
    return jsonify(search_data[time_search])


@app.route('/search/good', methods=["POST"])
def searchByGood():
    name = request.json["goodsname"]
    search_data = {
        "红豆":
            {'BuyFrom': 'ASD', 'Fee': 382, 'GoodsName': "红豆", 'GoodsNum': 13, 'GoodsPrice': 'aaa',
                'WareHouse': 'undefined', 'RHTime': '2022-01-25', 'CHinfo': 'No', 'id': '001'},
        "绿豆":
            {'BuyFrom': 'ASD', 'Fee': 382, 'GoodsName': "绿豆", 'GoodsNum': 13, 'GoodsPrice': 'aaa',
                'WareHouse': 'undefined', 'RHTime': '2022-01-25', 'CHinfo': 'No', 'id': '001'}
    }
    return jsonify(search_data[name])


@app.route('/search/person', methods=["POST"])
def searchByPerson():
    name = request.json["person"]
    # DATA: 货物名称-GoodsName 货物数量-GoodsNum 入货单价-GoodsPrice 交易对象-BuyFrom 仓库-WareHouse 运费-Fee 入货时间-RHTime
    search_data = {
        "老李":
            {'BuyFrom': '老李', 'Fee': 3856, 'GoodsName': "红豆", 'GoodsNum': 133,
                'GoodsPrice': 768, 'WareHouse': '2', 'RHTime': '2022-01-25', 'CHinfo': 'No'},
        "老王":
            {'BuyFrom': '老王', 'Fee': 346, 'GoodsName': "绿豆", 'GoodsNum': 34,
                'GoodsPrice': 148, 'WareHouse': '1', 'RHTime': '2022-01-25', 'CHinfo': 'No'}
    }
    return jsonify(search_data[name])

@app.route('/CH', methods=["POST"])
def CHGoods():
    data = request.json['data']
    print(data)
    CH_data.append(data)
    return jsonify(CH_data)


@app.route('/CHEdit', methods=["POST"])
def CHGoodsEdit():
    print(request.json)
    # if request.method == "GET":
    #     dataCH=request.json['data']
    #     CHDATA.append(dataCH)
    #     return jsonify(CHDATA)
    # else:
    name = request.json["id"]
    search_data_id = {
        "001":
            {'RH': {'BuyFrom': '老李', 'Fee': 3856, 'GoodsName': "红豆", 'GoodsNum': 133, 'GoodsPrice': 768, 'WareHouse': '2',
             'RHTime': '2022-01-25', 'CHinfo': 'Yes', },
             'CH': {'NumCH': '100', 'PriceCH': '700', 'FeeCH': '100', 'PersonCH': 'AAA'}},
        "002":
            {'RH': {'BuyFrom': '老B', 'Fee': 336, 'GoodsName': "红1", 'GoodsNum': 33, 'GoodsPrice': 28, 'WareHouse': '3',
                    'RHTime': '2022-01-24', 'CHinfo': 'Yes', },
             'CH': {'NumCH': '100', 'PriceCH': '700', 'FeeCH': '157', 'PersonCH': '小孙'}}
    }
    return jsonify(search_data_id[name])


# HostSearch---------
@app.route('/host1')
def searchHost1():
    host_data = {'goodsNum': 100, 'cost': 135600}
    print(host_data)
    return jsonify(host_data)


@app.route('/host2')
def searchHost2():
    host_data = {'goodsNum': 50, 'cost': 500}
    print(host_data)
    return jsonify(host_data)


@app.route('/host3')
def searchHost3():
    host_data = {'goodsNum': 100, 'cost': 600}
    print(host_data)
    return jsonify(host_data)


@app.route('/host4')
def searchHost4():
    host_data = {'goodsNum': 80, 'cost': 800}
    print(host_data)
    return jsonify(host_data)


@app.route('/host5')
def searchHost5():
    host_data = {'goodsNum': 10, 'cost': 10}
    print(host_data)
    return jsonify(host_data)


@app.route('/hosttotal')
def searchHost_total():
    host_data = {'goodsNum': 2000, 'cost': 70000}
    print(host_data)
    return jsonify(host_data)

# ProfitSearch------


@app.route('/profit')
def ProfitSearchMonth():
    profit_data = {'tol_GoodsNum': 2000, 'tol_ShipmentNum': 70000,
                   'tol_Cost': 50, 'tol_Profit': 6000}
    print(profit_data)
    return jsonify(profit_data)


if __name__ == "__main__":
    app.run(debug=True)
