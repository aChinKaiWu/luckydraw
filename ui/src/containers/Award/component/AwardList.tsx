import React, { useContext } from 'react'

import style from './AwardListStyle.scss'
import logo from '../../../assets/access-logo.png'
import AwardContext from '../AwardContext'
import AwardItem from './AwardItem'

function AwardList() {
  const { mockData } = useContext(AwardContext)

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>
          <img src={logo} className={style.logo} />
          <span>&nbsp;賞品一覧 PRIZE LIST</span>
        </h1>
      </div>
      <div className={style.content}>
        {mockData.map((e, i) => (
          <AwardItem key={i} winner={e} />
        ))}
      </div>
    </div>
  )
}
export default AwardList
