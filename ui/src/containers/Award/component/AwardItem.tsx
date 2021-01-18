import React, { useContext } from 'react'

import style from './AwardItemStyle.scss'
import AwardContext from '../AwardContext'
import AwardDerived from './AwardDerived'

interface Props {
  award: AwardDerived
}

function AwardItem(props: Props) {
  const {
    award: { content, price, winnerName, provider }
  } = props
  const { handleGetWinner } = useContext(AwardContext)

  return (
    <div className={style.container}>
      <div className={style.prize}>
        <p>
          {content} (NT${price})
          <br />
          {provider && <span className={style.provider}>From: {provider}</span>}
        </p>
      </div>
      {winnerName ? (
        <div className={style.winner}>{winnerName}</div>
      ) : (
        <div className={style['winner--none']} onClick={() => handleGetWinner(props.award)}>
          抽 DRAW ガチャる
        </div>
      )}
    </div>
  )
}

export default AwardItem
