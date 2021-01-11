import React, { useRef, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import Konva from 'konva'
import { IFrame } from 'konva/types/types'
import { Layer } from 'konva/types/Layer'
import Wheel from './components/Wheel'
import { winnerVar } from '@src/config/apolloClient'
import { CUR_AWARD_QUERY } from '@src/query/award'
import { CHOOSE_WINNER } from '@src/query/winner'
import { GetCurrentAward } from '@src/__generated__/GetCurrentAward'
import { ChooseWinner } from '@src/__generated__/ChooseWinner'
import Slide from './components/Slide'
import styles from '././DrawerStyle.scss'
import routes from '../../constants/routes'

const ANIMATION_TIME = 10000
const HALF_LIFE = ANIMATION_TIME / 2
const ANIMATION_SPEED_NUMBER = 250

const MEMBERS = [
  'Chin-Kai Wu',
  'Yuichiro Yasukawa',
  'Kingsley Lim',
  'Yukio Takeda',
  'Edward Huang',
  'Harper Chuang',
  'Hank Lin',
  'Evan Tseng',
  'Hueiling Lee',
  'Zibin Huang',
  'Joy Chiu',
  'Shangxuan Yang',
  'Wilson Chen',
  'Gilles Bertal',
  'Steven Chiu',
  'Giles Shao',
  'Henry Huang',
  'Yishin Ho',
  'Samantha Huang',
  'Mike Chen',
  'Yuwen Su',
  'Peter Tsai',
  'Jim Lin',
  'Jerry Guo',
  'Michael Poernomo',
  'Eric Liao',
  'Rex Yeh',
  'Robi Hamanto',
  'Stanley Liang',
  'Vincent Yang',
  'Rufus Tsai',
  'Leon Chang'
]

const FUNNY_WORDS = ['抽我抽我', '抽不到啊', '一抽入魂']

const getRandomInt: (min: number, max: number) => number = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomShuffle: <T>(list: T[]) => T[] = (list) => {
  if (list.length <= 1) return list

  for (let i = 0; i < list.length; i++) {
    const random = getRandomInt(i, list.length - 1)
    const temp = list[random]
    list[random] = list[i]
    list[i] = temp
  }

  return list
}

export default function Drawer() {
  const history = useHistory()
  const [readyToMove, setReadyToMove] = useState({ animationOver: false, foundWinner: false })
  const frontRef = useRef<Layer>(null)
  const { data } = useQuery<GetCurrentAward>(CUR_AWARD_QUERY)
  const [findWinner] = useMutation<ChooseWinner>(CHOOSE_WINNER, {
    onCompleted(data) {
      winnerVar(data)
      setReadyToMove((pre) => ({ ...pre, foundWinner: true }))
    },
    onError() {
      //temp
      setReadyToMove((pre) => ({ ...pre, foundWinner: true }))
    }
  })

  const itemList = randomShuffle<string>(MEMBERS.concat(FUNNY_WORDS))

  useEffect(() => {
    handleWheelRotation()
    setTimeout(() => setReadyToMove((pre) => ({ ...pre, animationOver: true })), ANIMATION_TIME)
  }, [frontRef, history])

  useEffect(() => {
    data?.curAward?.id && findWinner({ variables: { awardId: data?.curAward?.id } })
  }, [data?.curAward?.id, findWinner])

  useEffect(() => {
    Object.values(readyToMove).every((cur) => cur === true) && history.push(routes.winner)
  }, [readyToMove, history])

  const handleWheelRotation = () => {
    const anim = new Konva.Animation((frame?: IFrame) => {
      const speed = frame ? frame.time : 0
      const speedDiff = speed < HALF_LIFE ? speed : ANIMATION_TIME - speed
      frontRef.current?.rotate(speedDiff / ANIMATION_SPEED_NUMBER)
    }, frontRef.current?.getLayer())

    anim.start()
    setTimeout(() => anim.stop(), ANIMATION_TIME)
  }

  return data?.curAward ? (
    <div className={styles.drawer}>
      <Slide itemList={itemList} />
      <Wheel width={window.innerWidth} height={window.innerHeight} frontRef={frontRef} />
    </div>
  ) : (
    <Redirect to={routes.award} />
  )
}
