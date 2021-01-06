import React from 'react'
import classnames from 'classnames'
import Button from '../../components/Button'
import style from './style.scss'
import goldIcon from '../../assets/gold_icon.svg'
import { randomGif } from './randomGif'

const randomGifInstance = randomGif()

const Winner = ({}) => {
  const gif = randomGifInstance.get()
  return (
    <>
      <div className={style.winner}>
        <img className={style.winner_gif_container} src={gif} alt='' />
        <div className={style.result}>
          <div className={style.result_award}>
            <span>$10,000</span>
            <img className={style.result_goldIcon} src={goldIcon} alt='gold' />
          </div>
          <div className={style.result_name}>
            <h1 className={style.text_animation}>
              <span>Jerry</span>
              <span>Winner</span>
            </h1>
          </div>
        </div>
        <p className={classnames(style.text_animation, style.congratulation)}>
          <span>Congratulations!!!</span>
        </p>
      </div>
      <div className={style.options}>
        <Button className={style.options_award}>Awards</Button>
        <Button className={style.options_donate}>Donate</Button>
      </div>
    </>
  )
}

export default Winner
