import React from 'react'

import style from './AwardItemStyle.scss'
import AwardDerived from './AwardDerived'

interface Props {
  award: AwardDerived
  fullView: boolean
}

function AwardItemCompact(props: Props) {
  const {
    award: { content, price }
  } = props

  return (
    <div className={style.containerCompact}>
      <div className={style.prizeCompact}>
        <p>
          {content} (NT${price})
        </p>
      </div>
    </div>
  )
}

export default AwardItemCompact
