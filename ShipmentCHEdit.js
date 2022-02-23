import React, { useState, useEffect } from 'react'

import { Input, Button, Form, Dialog } from 'antd-mobile'
import axios from "axios"


const ShipmentCHEdit = (good) => {
    const [shipmentForm] = Form.useForm()

    const [id, setid]=useState()
    const [infoCH, setinfoCH] = useState({
        goodsId:'',
        outBuyFrom: "",
        outGoodsPrice: "",
        outGoodsFee: "",
        outGoodsNum: "",
        outTime: ""
    })
    const [loding, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                {
                    method: "post",
                    url: 'http://localhost:8000/getgoodsinfo',
                    data: { "GoodsID": String(good.value.goodsId)},
                }
            );
            setid(result.data.goodsId)
            setinfoCH(
                {
                    goodsId: result.data.goodsId,
                    outBuyFrom: result.data.outBuyFrom,
                    outGoodsPrice: result.data.outGoodsPrice,
                    outGoodsFee: result.data.outGoodsFee,
                    outGoodsNum: result.data.outGoodsNum,
                    outTime: result.data.outTime
                }

            );
            shipmentForm.setFieldsValue(infoCH)
            setLoading(false)
        };
        fetchData()
    }
        , [loding])

    const onSubmit = () => {
        const values = shipmentForm.getFieldsValue()
        
        values.goodsId=id
        console.log(values)
        axios({
            method: "post",
            url: 'http://localhost:8000/OutEdit',
            data: values,
        }).then(Dialog.alert({content: '已成功更新您的信息'}))
    }
    
    

    return (
        <Form layout='vertical'
            form={shipmentForm}

            footer={
                <Button block color='primary' onClick={onSubmit} size='large'>
                    提交
                </Button>
            }>

            <Form.Item label='出货交易对象' name='outBuyFrom'>
                <Input clearable />
            </Form.Item>
            <Form.Item label='出货单价' name='outGoodsPrice'>
                <Input clearable />
            </Form.Item>
            <Form.Item label='出货运费' name='outGoodsFee'>
                <Input clearable />
            </Form.Item>
            <Form.Item label='出货数量' name='outGoodsNum'>
                <Input clearable />
            </Form.Item>
            <Form.Item label='出货日期' name='outTime'>
                <Input clearable />
            </Form.Item>
        </Form>
    )

}

export default ShipmentCHEdit