import React, { useRef } from 'react'
import Konva from 'konva'
import { IFrame } from 'konva/types/types'
import { Layer } from 'konva/types/Layer'
import Wheel from './components/Wheel'

const ANIMATION_TIME = 10000
const HALF_LIFE = ANIMATION_TIME / 2

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
    <>
      <button onClick={handleWheelRotation}>Start Rotation</button>
      <Wheel width={window.innerWidth} height={window.innerHeight} frontRef={frontRef} />
    </>
  )
}
