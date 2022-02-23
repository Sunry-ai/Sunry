import React, { useState, useEffect } from 'react'
import { Input, Button, Form, Picker, Toast } from 'antd-mobile'
import axios from "axios"

const ShipmentCH = (value) => {
  const obj = value.value
  const [visiblePersonCH, setVisiblePersonCH] = useState(false)
  const [PersonCHColumns, setBuyFromColumns] = useState([])
  const [shipmentCHForm] = Form.useForm()

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/getbuyfrom")
      .then(response => {
        setBuyFromColumns([response.data]);
      })
  }, [])

  const ClickCH = () => {
    Toast.show({ content: '正在更新您的出货信息，如果没有填入所有必须数据则不会更新～' })
  }

  const onFinish = () => {
    const formvalues = shipmentCHForm.getFieldsValue()
    const formvalues_tmp = formvalues
    

    formvalues.outBuyFrom = formvalues_tmp.outBuyFrom[0]
    


    console.log(obj.goodsId)
    axios({
      method: "post",
      url: 'http://localhost:8000/OutSet',
      data: formvalues,
    })
      .then(Toast.show({ content: '已更新您的信息' }), console.log(formvalues))

    axios({
      method: "post",
      url: 'http://localhost:8000/UpdateInfoSet',
      data: { 'UpdateOutInfo': String(obj.goodsId) },
    })
  }

  return (

    <div>
      <li>货物名字: {obj.goodsName}</li>
      <li>交易对象: {obj.inBuyFrom} </li>
      <h3>请输入出货信息</h3>
      <Form
        form={shipmentCHForm}
        onFinish={onFinish}
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary' onClick={ClickCH}>
            提交
          </Button>
        }
      >
        <Form.Item name='outGoodsNum' label='出货数量'
          rules={[{ required: true, message: '数量不能为空' }]}>
          <Input placeholder='请输入出货数量' />
        </Form.Item>

        <Form.Item name='outGoodsPrice' label='出货价格'
          rules={[{ required: true, message: '价格不能为空' }]}>
          <Input placeholder='请输入出货价格' />
        </Form.Item>

        <Form.Item name='outGoodsFee' label='货物运费'
          rules={[{ required: true, message: '运费不能为空' }]}>
          <Input placeholder='请输入出货的运费' />
        </Form.Item>

        <Form.Item name='outTime' label='出货日期'
          rules={[{ required: true, message: '出货日期不能为空' }]}>
          <Input placeholder='输入日期如2000-01-25' />
        </Form.Item>

        <Form.Item
          name='outBuyFrom'
          label='货物交易人'
          onClick={() => {
            setVisiblePersonCH(true)
          }}>

          <Picker
            columns={PersonCHColumns}
            visible={visiblePersonCH}
            onClose={() => {
              setVisiblePersonCH(false)
            }}
            onConfirm={v => {
              shipmentCHForm.setFieldsValue({ 'outBuyFrom': v }
              )
            }}
          >{value =>
            value ? shipmentCHForm.getFieldValue("outBuyFrom") : '未选择'
            }</Picker>

        </Form.Item>
      </Form>
    </div>)
}

export default ShipmentCH