import React from 'react'
import { WheelBack, WheelBackGround, WheelCenter, WheelFront, WheelNeedle } from './WheelComponents'

export default function Wheel() {
  return (
    <>
      <WheelBackGround />
      <WheelBack />
      <WheelFront />
      <WheelCenter />
      <WheelNeedle />
    </>
  )
}
