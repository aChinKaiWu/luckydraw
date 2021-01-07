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

export default function Drawer() {
  const history = useHistory()
  const frontRef = useRef<Layer>(null)

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
      <Slide memberList={MEMBERS} />
      <Wheel width={window.innerWidth} height={window.innerHeight} frontRef={frontRef} />
    </div>
  )
}
