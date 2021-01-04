import React from 'react'
import { WheelBack, WheelCenter, WheelFront, WheelNeedle } from './WheelComponents'

export default function Wheel() {
  return (
    <>
      <WheelBack />
      <WheelFront />
      <WheelCenter />
      <WheelNeedle />
    </>
  )
}
