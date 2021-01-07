import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import Konva from 'konva'
import { IFrame } from 'konva/types/types'
import { Layer } from 'konva/types/Layer'
import Wheel from './components/Wheel'
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
  const frontRef = useRef<Layer>(null)
  const itemList = randomShuffle<string>(MEMBERS.concat(FUNNY_WORDS))

  useEffect(() => {
    handleWheelRotation()
    setTimeout(() => history.push(routes.winner), ANIMATION_TIME)
  }, [frontRef, history])

  const handleWheelRotation = () => {
    const anim = new Konva.Animation((frame?: IFrame) => {
      const speed = frame ? frame.time : 0
      const speedDiff = speed < HALF_LIFE ? speed : ANIMATION_TIME - speed
      frontRef.current?.rotate(speedDiff / ANIMATION_SPEED_NUMBER)
    }, frontRef.current?.getLayer())

    anim.start()
    setTimeout(() => anim.stop(), ANIMATION_TIME)
  }

  return (
    <div className={styles.drawer}>
      <Slide itemList={itemList} />
      <Wheel width={window.innerWidth} height={window.innerHeight} frontRef={frontRef} />
    </div>
  )
}
