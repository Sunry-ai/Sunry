import React, { useState, useRef, useEffect } from 'react'
import { Input, Button, Tabs, Divider ,DatePicker, Space,Toast} from 'antd-mobile'
import axios from "axios"
import { Link } from 'react-router-dom'
import ShipmentModle from './ShipmentModle'
import { options } from "./asset/data"

const ShipmentSearch = (good) => {
  const loginState = good.value;
  const [searchBygoods, setsearchBygoods] = useState('');
  const [GoodsResult, setGoodsResult] = useState();

  const [searchByname, setsearchByname] = useState('');
  const [NameResult, setNameResult] = useState();

  const [searchByTime, setsearchByTime] = useState();

  //searchBygoods-----------------------
  const latestgoodMessage = useRef('');
  useEffect(() => {
    latestgoodMessage.current = searchBygoods;
  });

  const showGoodsMessage = () => {
    if (latestgoodMessage.current !== '') {
      axios({
        method: "post",
        url: 'http://localhost:8000/search/goods',
        data: { "GoodsName": String(latestgoodMessage.current)} ,
        }).then(
          response => {
            setGoodsResult(response.data)
          }
        )
    };
  };
  const handlegoodsClick = () => {
    setTimeout(showGoodsMessage, 1000);
  };
  const handleMessageGoodsChange = (e) => {
    setsearchBygoods(e);
  };
  //searchByname-----------------------
  const latestnameMessage = useRef('');
  useEffect(() => {
    latestnameMessage.current = searchByname;
  });
  const showNameMessage = () => {
    if (latestnameMessage.current !== '') {
      axios({
        method: "post",
        url: 'http://localhost:8000/search/person',
        data: { "Person": String(latestnameMessage.current)} ,
        }).then(
          response => {
            console.log("...",response.data)
            setNameResult(response.data)
          }
        )
    };
  };
  const handlenameClick = () => {
    setTimeout(showNameMessage, 1000);
  };
  const handleMessageNameChange = (a) => {
    setsearchByname(a);
  }

  // ----------------------------------------
  // ----------------------------------------
  const [begin, setbegin] = useState('?????????')
  const [over, setover] = useState('?????????')
  const [greenvalue, setgreenValue] = useState('?????????')
  const now = new Date()

  function showTimeMessage(greenvalue) {
    if (greenvalue !== '?????????') {
    axios({
      method: "post",
      url: 'http://localhost:8000/search/time',
      data: { "searchTime": String(greenvalue)} ,
      }).then(
        response => {
          console.log("...",response.data)
          setsearchByTime(response.data)
        }
      )};
  }

  function showPeriodMessage(begin,over) {
    if (begin !== '?????????') {
      if (over !== '?????????'){
    axios({
      method: "post",
      url: 'http://localhost:8000/search/periodtime',
      data: {'TimePeriodBegin':begin,'TimePeriodOver':over} ,
      }).then(
        response => {
          console.log("...",response.data)
          setsearchByTime(response.data)
        }
      )};};
  }
  
  function RenderChildrenDemo() {
    
    const [visible_begin, setVisiblebegin] = useState(false)
    const [visible_over, setVisibleover] = useState(false)
    const [visible_green, setVisiblegreen] = useState(false)

    return (
      <Space align='center' wrap>
        <Button color='primary' block shape='rounded'
          onClick={() => {
            setVisiblebegin(true)
          }}
        >
           ??????????????????????????????
        </Button>
        <DatePicker
          visible={visible_begin}
          onClose={() => {
            setVisiblebegin(false)
          }}
          defaultValue={now}
          max={now}
          onConfirm={val => {
            Toast.show(val.toLocaleDateString());
            setbegin(val.toISOString())
            console.log(val.toLocaleDateString())
          }}

        >
          {value => value?.toLocaleDateString()}
        </DatePicker>
        <br/>
        <Button color='primary' block shape='rounded'
          onClick={() => {
            setVisibleover(true)
          }}
        >
           ??????????????????????????????
        </Button>
        <DatePicker
          visible={visible_over}
          onClose={() => {
            setVisibleover(false)
          }}
          defaultValue={now}
          max={now}
          onConfirm={val => {
            Toast.show(val.toLocaleDateString());
            setover(val.toISOString())
            console.log(begin)
            console.log(over)
            showPeriodMessage(begin,over)
          }}
        >
          {value => value?.toLocaleDateString()}
        </DatePicker>
        <br/>
        <Divider />

        <Button color='success' block shape='rounded'
          onClick={() => {
            setVisiblegreen(true)
          }}
          
        >
           ????????????????????????
        </Button>
        <DatePicker
          visible={visible_green}
          onClose={() => {
            setVisiblegreen(false)
          }}
          defaultValue={now}
          max={now}

          onConfirm={val => {
            Toast.show(val.toLocaleDateString());
            setgreenValue(val.toISOString());
            console.log(greenvalue);
            showTimeMessage(greenvalue)
          }}
        >
          {value => value?.toLocaleDateString()}
        </DatePicker>
      </Space>
      
    )
  }

  if (loginState) {
    return <div key='makeSearchTable' style={{ "height": 700 }} >

      <Tabs>
        <Tabs.Tab key='SearchBytime' title='????????????'>
          <RenderChildrenDemo />
          <br />
          <h2>??????????????? <br />
            {ShipmentModle(searchByTime)}  </h2>
        </Tabs.Tab>

        <Tabs.Tab key='SearchBygoods' title='????????????'>
          <br />
          <br />
          <Input value={searchBygoods} onChange={handleMessageGoodsChange} placeholder='??????????????????????????????????????????????????????' />
          <br />
          <Button color='primary' block shape='rounded' onClick={handlegoodsClick}>
            ??????
          </Button>
          <h2>???????????????{ShipmentModle(GoodsResult)}
          </h2>
        </Tabs.Tab>

        <Tabs.Tab key='SearchByname' title='????????????'>
          <br />
          <br />
          <Input value={searchByname} onChange={handleMessageNameChange} placeholder='????????????????????????????????????????????????????????????' />
          <br />
          <Button color='primary' block shape='rounded' onClick={handlenameClick}>
            ??????
          </Button>
          <h2>???????????????</h2>
            
          {ShipmentModle(NameResult)} 
          
        </Tabs.Tab>

      </Tabs>

    </div>
  }
  else {
    return <div style={{ "height": 700 }}><Link to={{
      pathname: '/login',
    }}
    >
      <br />
      <h2> ?????????????????????????????????????????? </h2>
      <br />
      <Button color='primary' block shape='rounded'>
        ???????????????
      </Button>
    </Link>
    </div>
  }
}

export default ShipmentSearch