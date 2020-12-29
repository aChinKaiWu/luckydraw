import React from 'react'
import { Circle, Layer, Stage } from 'react-konva'

const Wheel = () => <Circle x={200} y={100} radius={50} fill='#ccc' />

export default function Drawer() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Wheel />
      </Layer>
    </Stage>
  )
}
