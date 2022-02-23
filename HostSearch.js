//库存查询

import React, { useState, useEffect } from 'react'
import { Collapse, Button } from 'antd-mobile'
import axios from "axios"
import { Link } from 'react-router-dom'

const HostSearch = (value) => {
  const loginState = value.value

  //Host1---------------------
  const [goodsNum_Host1, setgoodNum1] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host1")
      .then(response => {
        setgoodNum1([response.data.goodsNum])
      })
  }, [])

  const [Cost_Host1, setCostHost1] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host1")
      .then(response => {
        setCostHost1([response.data.hostCost])
      })
  }, [])

  //Host2-------------------

  const [goodsNum_Host2, setgoodNum2] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host2")
      .then(response => {
        setgoodNum2([response.data.goodsNum])
      })
  }, [])

  const [Cost_Host2, setCostHost2] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host2")
      .then(response => {
        setCostHost2([response.data.hostCost])
      })
  }, [])

  //Host3-------------------
  const [goodsNum_Host3, setgoodNum3] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host3")
      .then(response => {
        setgoodNum3([response.data.goodsNum])
      })
  }, [])

  const [Cost_Host3, setCostHost3] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host3")
      .then(response => {
        setCostHost3([response.data.hostCost])
      })
  }, [])

  //Host4-------------------
  const [goodsNum_Host4, setgoodNum4] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host4")
      .then(response => {
        setgoodNum4([response.data.goodsNum])
      })
  }, [])

  const [Cost_Host4, setCostHost4] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host4")
      .then(response => {
        setCostHost4([response.data.hostCost])
      })
  }, [])

  //Host5-------------------
  const [goodsNum_Host5, setgoodNum5] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host5")
      .then(response => {
        setgoodNum5([response.data.goodsNum])
      })
  }, [])

  const [Cost_Host5, setCostHost5] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/host5")
      .then(response => {
        setCostHost5([response.data.hostCost])
      })
  }, [])

  //Host Total-------------------
  const [goodsNum_Total, setgoodNumTotal] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/hosttotal")
      .then(response => {
        setgoodNumTotal([response.data.goodsNum])
      })
  }, [])

  const [Cost_Total, setCostTotal] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/hosttotal")
      .then(response => {
        setCostTotal([response.data.hostCost])
      })
  }, [])

  if (loginState) {
    return <div style={{ "height": 700 }} >
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel key='Host1' title='大连欧亚仓库'>
          <h2>此仓库现进货数量：{goodsNum_Host1} 吨
            <br />
            此仓库货物总成本：{Cost_Host1} 元</h2>
          <br />
        </Collapse.Panel>
        <Collapse.Panel key='Host2' title='大连外贸库'>
          <h2>此仓库现进货数量：{goodsNum_Host2} 吨
            <br />
            此仓库货物总成本：{Cost_Host2} 元</h2>
          <br />
        </Collapse.Panel>
        <Collapse.Panel key='Host3' title='中革二库'>
          <h2>此仓库现进货数量：{goodsNum_Host3} 吨
            <br />
            此仓库货物总成本：{Cost_Host3} 元</h2>
          <br />
        </Collapse.Panel>

        <Collapse.Panel key='Host4' title='羊圈子咯咯香库'>
          <h2>此仓库现进货数量：{goodsNum_Host4} 吨
            <br />
            此仓库货物总成本：{Cost_Host4} 元</h2>
          <br />
        </Collapse.Panel>

        <Collapse.Panel key='Host5' title='大队库'>
          <h2>此仓库现进货数量：{goodsNum_Host5} 吨
            <br />
            此仓库货物总成本：{Cost_Host5} 元</h2>
          <br />
        </Collapse.Panel>

        <Collapse.Panel key='HostTotal' title='所有仓库'>
          <h2>所有仓库现进货数量：{goodsNum_Total} 吨
            <br />
            所有仓库货物总成本：{Cost_Total} 元</h2>
          <br />
        </Collapse.Panel>

      </Collapse>

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

export default HostSearch




