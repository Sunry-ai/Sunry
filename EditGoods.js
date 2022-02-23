import React, { useState, useEffect } from 'react'
// import { useForm } from "react";
import { Form, Input, Slider, Button, Picker, Toast } from 'antd-mobile'
import axios from "axios"
import { Link } from 'react-router-dom'
import moment from "moment";

const EditGoods = (value) => {
  const loginState = value.value
  const [editForm] = Form.useForm()
  const [valuePartner, setValuePartner] = useState([])

  const [numId, setnumId] = useState(0)//初始值从后端拿最大的Id

  const onFinish = () => {
    const formvalue = editForm.getFieldsValue()
    const formvalue_tmp=formvalue
    formvalue.inFrom = formvalue_tmp.inFrom[0]
    formvalue.Partner = formvalue_tmp.Partner[0]
    formvalue.WareHouse = formvalue_tmp.WareHouse[0]
    formvalue.inTime = "dddd"//moment().format('YYYY-MM-DD')
    formvalue.goodsState = 'in'
    formvalue.inGoodsId = String(numId)
    //const result={"inGoodsId":formvalue.inGoodsId}
    console.log(formvalue)
    axios({
      method: "post",
      url: 'http://127.0.0.1:8000/editgoods',
      data: formvalue,
    }).then(
      Toast.show({ icon: 'success', content: '已更新您的信息' }))
  }

  const [buyFromColumns, setBuyFromColumns] = useState([])
  const [partnerColumns, setPartnerColumns] = useState([])
  const [wareHouseNumColumns, setWareHouseNumColumns] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/getbuyfrom")
      .then(response => {
        setBuyFromColumns([response.data])
      });

    axios.get("http://127.0.0.1:8000/getpartner")
      .then(response => {
        setPartnerColumns([response.data])
      });

    axios.get("http://127.0.0.1:8000/getwarehousecolumns")
      .then(response => {
        setWareHouseNumColumns([response.data])
      });
    // axios.get("http://127.0.0.1:8000/goodsid")
    //   .then(response => {
    //     setnumId([response.data])
    //   });
  }, [])


  const [visibleBuyFrom, setVisibleBuyFrom] = useState(false)
  const [visibleWareHouse, setVisibleWareHouse] = useState(false)
  const [visiblePartner, setVisiblePartner] = useState(false)

  const marks = {
    0: 0, 20: 0.2, 40: 0.4, 50: 0.5, 60: 0.6, 80: 0.8, 100: 1,
  }
  const [onAfterChangeValue, setAfterValue] = useState(10)



  if (loginState) {

    return <div style={{ "height": 700 }}>
      <Form
        form={editForm}
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' shape='rounded'
            onClick={() =>
              Toast.show({ content: '正在更新您的信息，如果没有填入所有必须数据则不会更新～' })} >
            <h3>我已确认，提交 </h3>
          </Button>
        }
      >
        <Form.Item
          name='inGoodsName'
          label='货物名称'
          rules={[{ required: true, message: '请填入货物名称' }]}
        >
          <Input placeholder='请输入货物名称' />
        </Form.Item>
        <Form.Item
          name='inGoodsNum'
          label='货物数量'
          rules={[{ required: true, message: '货物数量不能为空' }]}>
          <Input placeholder='请写入货物数量' />
        </Form.Item>
        <Form.Item
          name='inGoodsPrice'
          label='入货单价'
          rules={[{ required: true, message: '进货单价不能为空' }]}>
          <Input placeholder='请输入进货单价' />
        </Form.Item>

        <Form.Item
          name='inFrom'
          label='交易对象'
          onClick={() => {
            console.log({ buyFromColumns })
            setVisibleBuyFrom(true)
          }}>

          <Picker
            columns={buyFromColumns}
            visible={visibleBuyFrom}
            onClose={() => {
              setVisibleBuyFrom(false)
            }}
            onConfirm={v => {
              editForm.setFieldsValue({"inFrom":v})
            }}
          >{value =>
            value ? [editForm.getFieldValue("inFrom")] : '未选择'
            }</Picker>

        </Form.Item>

        <Form.Item
          name='WareHouse'
          label='货物放入仓库'
          onClick={() => {
            setVisibleWareHouse(true)
          }}
        >
          <Picker
            columns={wareHouseNumColumns}
            visible={visibleWareHouse}
            onClose={() => {
              setVisibleWareHouse(false)
            }}
            onConfirm={v => {
              editForm.setFieldsValue({ "WareHouse": v })
            }}
          >{value =>
            value ? editForm.getFieldValue("WareHouse") : '未选择'
            }</Picker>
        </Form.Item>

        <Form.Item
          name='inGoodsFee'
          label='货物费用'
          rules={[{ required: true, message: '运费不能为空' }]}>
          <Input placeholder='请输入货物的总运费' />

        </Form.Item>

        <Form.Item
          name='Partner'
          label='合伙人'
          onClick={() => {
            setVisiblePartner(true)
          }}>

          <Picker
            columns={partnerColumns}
            visible={visiblePartner}
            onClose={() => {
              setVisiblePartner(false)
            }}
            value={valuePartner[0]}
            onConfirm={v => {
              editForm.setFieldsValue({"Partner":v})
            }}
          >{value =>
            value ? editForm.getFieldValue("Partner") : '无'
            }</Picker>

        </Form.Item>

        <Form.Item
          name="profitRatio"
          label={"利润占比:"}
        >
          <Slider marks={marks} ticks
            onAfterChange={(value: number) => { editForm.setFieldsValue({ 'ratio': value }) }} />
        </Form.Item>


      </Form>
      <br />
      <br />

    </div>
  }
  else {
    return <div style={{ "height": 700 }}><Link to={{
      pathname: '/login',
    }}
    >
      <br />
      <h2> 抱歉，您未登录，无法进入系统 </h2>
      <br />
      <Button color='primary' block shape='rounded'>
        返回登陆页
      </Button>
    </Link>
    </div>
  }
}

export default EditGoods