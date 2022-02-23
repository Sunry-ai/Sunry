import React, { useState, useRef, useEffect } from 'react'
import { List, Input, Button, Space,Toast } from 'antd-mobile'
import { useNavigate} from 'react-router-dom'
import { UserOutline } from 'antd-mobile-icons'



const Login = (value) => {
    const navigate = useNavigate()
    const setLoginState = value.loginFunction;
    const [nameMessage, setnameMessage] = useState('');
    const [pswMessage, setpswMessage] = useState('')
    
    const ConfirmLogin = () => {

        if (latestName.current==='laowan' && latestPsw.current==='5188'){
             setLoginState(true) 
             navigate("/home")     
        }
        
        else{
            //!!!!!!!!!!!!!!!!!!!
            setLoginState(true) 
            navigate("/home") 
            //!!!!!!!!!!!!!!!1
            Toast.show({ icon: 'fail', content: "帐号或密码不对，请重新输入" })
        }
    }

    const nameMessageChange = (e) => { setnameMessage(e) }
    const pswMessageChange = (e) => { setpswMessage(e) }

    const latestName = useRef('');
    useEffect(() => {latestName.current = nameMessage;})
    const latestPsw = useRef('');
    useEffect(() => {latestPsw.current = pswMessage;})


    return (

        <div style={{ "height": 700 }} >

            <br /><br />
            <Space wrap align='center'>
                <UserOutline fontSize={48} /><h2> 请您登录： </h2>
            </Space>
            <br /><br />

            <List >
                <List.Item title='用户名' >
                    <Input placeholder='请输入用户名' clearable onChange={nameMessageChange} />
                </List.Item>
                <List.Item title='密码'>
                    <Input placeholder='请输入密码' clearable type='password' onChange={pswMessageChange} />
                </List.Item>
            </List>
            <br />
            <Button color='primary' block shape='rounded' onClick={ConfirmLogin}>
                确认,登录
            </Button>
            
            

        </div>
    )
}

export default Login