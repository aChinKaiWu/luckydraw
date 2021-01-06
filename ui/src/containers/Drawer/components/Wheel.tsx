import React, { RefObject } from 'react'
import { Layer } from 'konva/types/Layer'
import { WheelBack, WheelCenter, WheelFront, WheelNeedle } from './WheelComponents'

export default function Wheel({ frontRef }: { frontRef: RefObject<Layer> }) {
  return (
    <>
      <WheelBack />
      <WheelFront layerRef={frontRef} />
      <WheelCenter />
      <WheelNeedle />
    </>
  )
}
