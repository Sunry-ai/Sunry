import React, { useState } from 'react'
import { Button, Collapse, Popup } from 'antd-mobile'


const ShowSeachResult = (searchPerson) => {
  const [visibleCH, setVisibleCH] = useState(false)
  const [visibleEdit, setvisibleEdit] = useState(false)
  const [visibleCHEdit, setvisibleCHEdit] = useState(false)


  if (searchPerson === []) {
    return <div>无数据</div>
  }
  if (searchPerson === undefined) {
    return <div>无数据</div>
  }
  else {
    return searchPerson.map(
      (obj, index) =>
        <div>
        
          <Collapse >
            <Collapse.Panel key={String(index + 1)} title={obj.goodsName + '-交易人:'+obj.inBuyFrom+'-入货'+obj.inTime}>
              <li >
                货物名字: {obj.goodsName}
              </li>
              <li>
                入货时间: {obj.inTime}
              </li>
              <li >
                交易对象: {obj.inBuyFrom}
              </li>
              <li>
                入货单价: {obj.inGoodsPrice}
              </li>
              <li>
                货物运费: {obj.inGoodsFee}
              </li>
              <li>
                货物数量: {obj.goodsNum}
              </li>
              <li>
                仓库: {obj.WareHouse}
              </li>
              <li>
                是否已出货: {obj.outInfo}
              </li>
              {/* <Button onClick={() => { setVisibleCH(true) }}>出货</Button>
              <Popup visible={visibleCH} onMaskClick={() => { setVisibleCH(false) }}
                position='top' bodyStyle={{ minHeight: '40vh' }} >
                <ShipmentCH value={obj} />
              </Popup>

              <Button onClick={() => { setvisibleEdit(true) }}>编辑入货信息</Button>
              <Popup visible={visibleEdit} onMaskClick={() => { setvisibleEdit(false) }}
                position='top' bodyStyle={{ minHeight: '40vh' }} >
                <ShipmentEdit value={obj} />
              </Popup>

              <Button onClick={() => { setvisibleCHEdit(true) }}>编辑出货信息</Button>
              <Popup visible={visibleCHEdit} onMaskClick={() => { setvisibleCHEdit(false) }}
                position='top' bodyStyle={{ minHeight: '40vh' }} >
                
                <ShipmentCHEdit value={obj} />
              </Popup> */}
            </Collapse.Panel>
          </Collapse>
        </div>
    )
  }
}

export default ShowSeachResult
