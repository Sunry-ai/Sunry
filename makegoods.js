import React, { useState, useRef, useEffect } from 'react'
import { Card, Input, Button, Tabs, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom';
import axios from "axios"
// import styles from './demo.less'
import { AntOutline, RightOutline } from 'antd-mobile-icons'


const Make = (value) => {
    const loginState = value.value
    const [searchBygoods, setsearchBygoods] = useState('');
    const [GoodsResult, setGoodsResult] = useState();
  
    const [searchByname, setsearchByname] = useState('');
    const [NameResult, setNameResult] = useState();

    const onHeaderClick = () => {
        Toast.show('点击了卡片Header区域')
      }
    
    const onBodyClick = () => {
        Toast.show('点击了卡片Body区域')
      }
// ---------------------------------------------------------------
    const latestgoodMessage = useRef('');
    useEffect(() => {
    latestgoodMessage.current = searchBygoods;
        });
  const showGoodsMessage = () => {
    if (latestgoodMessage.current !== '') {
    //   axios({
    //     method: "post",
    //     url: 'http://localhost:8000/search/goods',
    //     data: { "GoodsName": String(latestgoodMessage.current)} ,
    //     }).then(
    //       response => {
    //         setGoodsResult(response.data)
    //       }
    //     )
    };
  };
  const handlegoodsClick = () => {
    setTimeout(showGoodsMessage, 1000);
  };
  const handleMessageGoodsChange = (e) => {
    setsearchBygoods(e);
  };
// --------------------------------------------
  const latestnameMessage = useRef('');
  useEffect(() => {
    latestnameMessage.current = searchByname;
  });
  const showNameMessage = () => {
    if (latestnameMessage.current !== '') {
    //   axios({
    //     method: "post",
    //     url: 'http://localhost:8000/search/person',
    //     data: { "Person": String(latestnameMessage.current)} ,
    //     }).then(
    //       response => {
    //         console.log("...",response.data)
    //         setNameResult(response.data)
    //       }
    //     )
    };
  };
  const handlenameClick = () => {
    setTimeout(showNameMessage, 1000);
  };
  const handleMessageNameChange = (a) => {
    setsearchByname(a);
  }
    if (loginState) {
        return <div key='makeSearchTable' style={{ "height": 700 }} >
        <Tabs>

        <Tabs.Tab key='SearchBygoods' title='货物名称'>
          <br />
          <br />
          <Input value={searchBygoods} onChange={handleMessageGoodsChange} placeholder='输入想搜索的货物名称（关键字也可以）' />
          <br />
          <Button color='primary' block shape='rounded' onClick={handlegoodsClick}>
            搜索
          </Button>
          <h2>搜索结果：</h2>

        </Tabs.Tab>

        <Tabs.Tab key='SearchByname' title='交易对象'>
          <br />
          <br />
          <Input value={searchByname} onChange={handleMessageNameChange} placeholder='输入想搜索的交易对象名字（关键字也可以）' />
          <br />
          <Button color='primary' block shape='rounded' onClick={handlenameClick}>
            搜索
          </Button>
          <h2>搜索结果：</h2>

          
        </Tabs.Tab>

      </Tabs>

    </div>
    }

    else {
    return <div style={{ "height": 700 }}><Link to={{
      pathname: '/make',
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


export default Make