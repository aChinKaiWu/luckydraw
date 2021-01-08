import React, { useContext } from 'react'

import style from './AwardItemStyle.scss'
import AwardContext from '../AwardContext'
import { AwardData } from '../../../__generated__/AwardData'

interface Props {
  award: AwardData
}

function AwardItem(props: Props) {
  const {
    award: { content, price, winner, providerName }
  } = props
  const { handleGetWinner } = useContext(AwardContext)

  return (
    <div className={style.container}>
      <div className={style.prize}>
        <p>
          {content} (NT${price})
          <br />
          {providerName && <span className={style.provider}>From: {providerName}</span>}
        </p>
      </div>
      {winner ? (
        <div className={style.winner}>{winner}</div>
      ) : (
        <div className={style['winner--none']} onClick={() => handleGetWinner(props.award)}>
          抽 DRAW ガチャる
        </div>
      )}
    </div>
  )
}

export default AwardItem
