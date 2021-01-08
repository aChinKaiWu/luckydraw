import React, { useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import Konva from 'konva'
import { Stage } from 'react-konva'
import { IFrame } from 'konva/types/types'
import { Layer } from 'konva/types/Layer'
import Wheel from './components/Wheel'
import routes from '@src/constants/routes.ts'
import { AwardData } from '@src/__generated__/AwardData'

const ANIMATION_TIME = 10000
const HALF_LIFE = ANIMATION_TIME / 2

export const CUR_AWARD_QUERY = gql`
  query getCurrentAward {
    curAward @client
  }
`

export default function Drawer() {
  const frontRef = useRef<Layer>(null)
  const { data: currAward } = useQuery<AwardData>(CUR_AWARD_QUERY)

  console.log('currAward', currAward)
  const handleWheelRotation = () => {
    const anim = new Konva.Animation((frame?: IFrame) => {
      const speed = frame ? frame.time / 500 : 0
      const speedDiff = speed < HALF_LIFE / 500 ? speed : ANIMATION_TIME / 500 - speed
      frontRef.current?.rotate(speedDiff)
    }, frontRef.current?.getLayer())

    anim.start()
    setTimeout(() => anim.stop(), ANIMATION_TIME)
  }

  return currAward ? (
    <>
      <button onClick={handleWheelRotation}>Start Rotation</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Wheel frontRef={frontRef} />
      </Stage>
    </>
  ) : (
    <Redirect to={routes.award} />
  )
}
