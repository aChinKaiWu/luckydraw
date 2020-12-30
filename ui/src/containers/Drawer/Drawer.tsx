import React from 'react'
import { Layer, Stage } from 'react-konva'
import Wheel from './components/Wheel'

export default function Drawer() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Wheel />
      </Layer>
    </Stage>
  )
}
