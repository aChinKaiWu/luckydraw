import React, { RefObject } from 'react'
import { Stage } from 'react-konva'
import { Layer } from 'konva/types/Layer'
import { WheelBack, WheelCenter, WheelFront, WheelNeedle } from './WheelComponents'
import styles from '../DrawerStyle.scss'

export default function Wheel({
  width,
  height,
  frontRef
}: {
  width: number
  height: number
  frontRef: RefObject<Layer>
}) {
  return (
    <div className={styles.wheel}>
      <Stage width={width} height={height}>
        <WheelBack />
        <WheelFront layerRef={frontRef} />
        <WheelCenter />
        <WheelNeedle />
      </Stage>
    </div>
  )
}
