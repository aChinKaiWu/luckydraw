import React, { useRef } from 'react'
import Konva from 'konva'
import { IFrame } from 'konva/types/types'
import { Layer } from 'konva/types/Layer'
import Wheel from './components/Wheel'
import Slide from './components/Slide'
import styles from '././DrawerStyle.scss'

const ANIMATION_TIME = 10000
const HALF_LIFE = ANIMATION_TIME / 2

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
  const frontRef = useRef<Layer>(null)

  const handleWheelRotation = () => {
    const anim = new Konva.Animation((frame?: IFrame) => {
      const speed = frame ? frame.time / 500 : 0
      const speedDiff = speed < HALF_LIFE / 500 ? speed : ANIMATION_TIME / 500 - speed
      frontRef.current?.rotate(speedDiff)
    }, frontRef.current?.getLayer())

    anim.start()
    setTimeout(() => anim.stop(), ANIMATION_TIME)
  }

  return (
    <div className={styles.drawer}>
      <Slide memberList={MEMBERS} />
      <button onClick={handleWheelRotation}>Start Rotation</button>
      <Wheel width={window.innerWidth} height={window.innerHeight} frontRef={frontRef} />
    </div>
  )
}
