
import React, { useState, useRef, useEffect } from 'react'
import { Divider, Input, Button, Toast ,Tag} from 'antd-mobile'
import { Link } from 'react-router-dom';
import axios from "axios"

const Home = (value) => {
  const loginState = value.value
  
  const [message, setMessage] = useState('');
  const [partnermessage, setPartnerMessage] = useState('');

  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  });

  const showMessage = () => {
    if (latestMessage.current !== '') {
      console.log('create name message: ' + latestMessage.current); //最新值
      axios({
        method: "post",
        url: 'http://localhost:8000/makebuyfrom',
        data: { "LatesNameMessage": String(latestMessage.current)},
      }).then(
        Toast.show({ icon: 'success', content: '您已成功添加交易人：' + latestMessage.current, }))
    };

  };

  const handleSendClick = () => {
    setTimeout(showMessage, 1000);
  };

  const handleMessageChange = (e) => {
    setMessage(e);
  };
  // --------------------------------------------------
  const latestPartner = useRef('');
  useEffect(() => {
    latestPartner.current = partnermessage;
  });

  const showPartner = () => {
    if (latestPartner.current !== '') {
      console.log('create name message: ' + latestPartner.current); //最新值
      axios({
        method: "post",
        url: 'http://localhost:8000/makepartner',
        data: { "latestPartner": String(latestPartner.current)},
      }).then(
        Toast.show({ icon: 'success', content: '您已成功添加交易人：' + latestPartner.current }))
    };
  };

  const PartnerSendClick = () => {
    setTimeout(showPartner, 1000);
  };

  const PartnerMessageChange = (e) => {
    setPartnerMessage(e);
  }

  if (loginState) {

    return <div style={{ "height": 700 }}>
      <div>
      <Tag>请在此输入您要添加的交易人姓名</Tag>
      <br />
      <Input value={message} onChange={handleMessageChange} placeholder="请在此输入您要添加的交易人姓名" />
      <br />
      <Button color='primary' block shape='rounded' onClick={handleSendClick}>
        确认并发送
      </Button>
      <br />
      <br />
      <Tag>请在此输入您要添加的合伙人姓名</Tag>
      <br />
      <Input value={partnermessage} onChange={PartnerMessageChange} placeholder="请在此输入您要添加的合伙人姓名" />
      <br />
      </div>
      <Button color='primary' block shape='rounded' onClick={PartnerSendClick}>
        确认并发送
      </Button>
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

export default Home