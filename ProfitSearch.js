import React from 'react'
import { Space, Cascader, Button } from 'antd-mobile'
import { useState, useEffect } from 'react'
import axios from "axios"
import moment from 'moment'
import { Link } from 'react-router-dom'
import { options} from "./asset/data"

const ProfitSearch = (good) => {
  const loginState = good.value

  //Year----------------
  const [tol_GoodsNum_Year, settolGoodsNumYear] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/profit")
      .then(response => {
        settolGoodsNumYear([response.data.inGoodsNum])
      })
  }, [])

  const [tol_ShipmentNum_Year, settolShipmentNumYear] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/profit")
      .then(response => {
        settolShipmentNumYear([response.data.outGoodsNum])
      })
  }, [])

  const [tol_Cost_Year, settolCostYear] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/profit")
      .then(response => {
        settolCostYear([response.data.totalCost])
      })
  }, [])

  const [tol_Profit_Year, settolProfitYear] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/profit")
      .then(response => {
        settolProfitYear([response.data.totalProfit])
      })
  }, [])
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState([])

  const showDetail = (value) => {
    if (value[0] === undefined) { return <></> }
    if (value[0] !== undefined && value[1] === undefined) 
    { return <h2> {value[0] + "年"}<br />
        进货数量：{tol_GoodsNum_Year} 吨<br />
        出货数量：{tol_ShipmentNum_Year} 吨<br />
        总成本：{tol_Cost_Year} 元<br />
        总利润：{tol_Profit_Year} 元<br />
      </h2> }
    if (value[0] !== undefined && value[1] !== undefined && value[2] === undefined )
    { return <h2> {value[0] + "年 "+value[1]+'季度'}<br />
        进货数量：{tol_GoodsNum_Year} 吨<br />
        出货数量：{tol_ShipmentNum_Year} 吨<br />
        总成本：{tol_Cost_Year} 元<br />
        总利润：{tol_Profit_Year} 元<br />
      </h2> }
    else {
      return <h2> {value[0] + "年第"+value[1]+'季度'+value[2]+'月'}<br />
        进货数量：{tol_GoodsNum_Year} 吨<br />
        出货数量：{tol_ShipmentNum_Year} 吨<br />
        总成本：{tol_Cost_Year} 元<br />
        总利润：{tol_Profit_Year} 元<br />
      </h2>
    }
  }

  const showMonthDetail = (value) => {
      return <h2> {'本月利润查询结果：'+value}<br />
        进货数量：{tol_GoodsNum_Year} 吨<br />
        出货数量：{tol_ShipmentNum_Year} 吨<br />
        总成本：{tol_Cost_Year} 元<br />
        总利润：{tol_Profit_Year} 元<br />
      </h2> }
  
  const date = new Date()

  const [monthvalue, setmonthValue] = useState([])

  const getmonth=(monthvalue)=>{
    console.log('getmonthdata', moment(date).format('YYYY-MM'))
    return setmonthValue(moment(date).format('YYYY-MM'))
  }
 
    
  if (loginState) {
  return <div style={{ "height": 700 }} >
    <Space  direction='vertical'>
      <br  />
      <br  />
      <Button color='primary' block shape='rounded' size='middle'
        onClick={() => {
          setVisible(true)
        }}
      >
        选择您想查询的日期
      </Button>
      <Cascader
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={value}
        onConfirm={setValue}
        onSelect={(val, extend) => {
          console.log('onSelect', val, extend.items)
        }}
      >
        {items => {
          if (items.every(item => item === null)) {
            return '未选择'
          } else {
            return items.map(item => item?.label ?? '未选择').join('-')
          }
        }}
      </Cascader>
      <br  />
      {showDetail(value)}

      <Button color='primary' block shape='rounded' size='middle'
        onClick={() => {
          getmonth(monthvalue);
        }}
      >
        查看本月的利润
      </Button>
      {showMonthDetail(monthvalue)}
    </Space>
    

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
}}

export default ProfitSearch
