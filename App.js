import { Badge, TabBar, NavBar } from 'antd-mobile'
import React, { useState } from 'react'
import EditGoods from "./EditGoods/EditGoods"
import ShipmentSearch from './ShipmentSearch/ShipmentSearch'
import HostSearch from "./HostSearch/HostSearch"
import ProfitSearch from './ProfitSearch/ProfitSearch'
import Home from "./Home/home"
import Login from './login'
import Make from './Make/makegoods'

import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  MemoryRouter as Router
} from 'react-router-dom'


import {
  AppOutline,
  SearchOutline,
  EditFill,
  TruckOutline,
  SetOutline,
  HandPayCircleOutline
} from 'antd-mobile-icons'


const Bottom = () => {
  const nevigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value) => {
    nevigate(value)
  }

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'editGoods',
      title: '录入货物',
      icon: <EditFill />,
    },
    {
      key: 'make',
      title: '加工',
      icon: <SetOutline />,
    },
    {
      key: 'shipmentSearch',
      title: '出货',
      icon: <TruckOutline />,
    },
    {
      key: 'hostSearch',
      title: '库存查询',
      icon: <SearchOutline />,
    },
    {
      key: 'profitSearch',
      title: '利润查询',
      icon: <HandPayCircleOutline />,
    },
  ]
  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)} safeArea={true} position={'fixed'} noRenderConten={false}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}



const Main = () => {
  const [loginState, setLoginState] = useState(false)

  return (
    <Router initialEntries={['/login']}>
      <NavBar>老万系统</NavBar>
      <div style={{ "height": 10, "display": "flex", "flexDirection": "column" }}>
        <div style={{ flex: "0", "borderBottom": "solid 2px", "paddingTop": "1px", "paddingBottom": "1px" }}>
        </div>
        <div >
          <Routes style={{ "height": 80, 'flex': 1, 'display': "flex", 'justify-content': 'center', 'align-items': 'center' }}>
            <Route exact path='/home' element={<Home value={loginState} />} />

            <Route exact path='/login' element={<Login loginFunction={setLoginState} value={loginState} />} />

            <Route exact path='/editGoods' element={<EditGoods value={loginState} />} />

            <Route exact path='/make' element={<Make value={loginState} />} />

            <Route exact path='/shipmentSearch' element={<ShipmentSearch value={loginState} />} />

            <Route exact path='/hostSearch' element={<HostSearch value={loginState} />} />

            <Route exact path='/profitSearch' element={<ProfitSearch value={loginState} />} />

          </Routes>
        </div>
        <div style={{ "flex": 0, "borderTop": "solid 2px",  "bottom": "1px" }}>
          <Bottom />
        </div>
      </div>
    </Router>
  )
}
// }
export default Main