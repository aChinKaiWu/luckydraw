import React, { useContext } from 'react'

import style from './AwardItemStyle.scss'
import AwardContext from '../AwardContext'

interface Props {
  winner: boolean
}

function AwardItem(props: Props) {
  const { winner } = props
  const { handleGetWinner } = useContext(AwardContext)

  return (
    <div className={style.container}>
      <div className={style.prize}>$100.000</div>
      {winner ? (
        <div className={style.winner}>MICHAEL</div>
      ) : (
        <div className={style['winner--none']} onClick={handleGetWinner}>
          抽 DRAW ガチャる
        </div>
      )}
    </div>
  )
}

export default AwardItem
