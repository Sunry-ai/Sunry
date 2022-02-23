import React from 'react'
// import  { useState, useEffect } from 'react'
import { Input, Button,  Form, Dialog } from 'antd-mobile'
import axios from "axios"


const ShipmentEdit = (good) => {

  const obj = good.value

  const [form] = Form.useForm()
  const onSubmit = () => {
    const values = form.getFieldsValue()
    values.WareHouse= obj.WareHouse
    values.outInfo= obj.outInfo
    values.goodsId= String(obj.goodsId)
    values.goodsNum= String(values.goodsNum)
    values.inGoodsFee= String(values.inGoodsFee)


    axios({
          method: "post",
          url: 'http://localhost:8000/InfoSet',
          data: values ,
          }).then(Dialog.alert({content: '已成功更新您的信息'}))
      console.log(values)
    }


  return (
    <Form layout='vertical'
      form={form}
      initialValues={obj}
      footer={
        <Button block color='primary' onClick={onSubmit} size='large'>
          提交
        </Button>
      }>
      <Form.Item label='货物名字' name='goodsName'>
        <Input placeholder={obj.goodsName}
          clearable
        />
      </Form.Item>
      <Form.Item label='交易对象' name='inBuyFrom'>
        <Input placeholder={obj.inBuyFrom} clearable />
      </Form.Item>
      <Form.Item label='入货单价' name='inGoodsPrice'>
        <Input placeholder={obj.inGoodsPrice} clearable />
      </Form.Item>
      <Form.Item label='货物运费' name='inGoodsFee'>
        <Input placeholder={obj.inGoodsFee} clearable />
      </Form.Item>
      <Form.Item label='货物数量' name='goodsNum'>
        <Input placeholder={obj.goodsNum} clearable />
      </Form.Item>
      <Form.Item label='入货仓库' name='WareHouse'>
        <Input placeholder={obj.WareHouse} clearable />
      </Form.Item>
      <Form.Item label='入货时间' name='inTime'>
        <Input placeholder={obj.inTime} clearable />
      </Form.Item>
    </Form>
  )
}

export default ShipmentEdit