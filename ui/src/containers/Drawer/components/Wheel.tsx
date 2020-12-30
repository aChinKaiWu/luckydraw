import React from 'react'
import { Circle, Shape } from 'react-konva'

const COUNT = 8
const START_DEG = -0.7
const DEG = (2 / (COUNT * 2)) * Math.PI

const PADDING = 50
const RADIUS = 300
const WHEEL_CENTER_RADIUS = 40
const WHEEL_CENTER = {
  X: PADDING + RADIUS,
  Y: PADDING + RADIUS
}

const WHEEL_BORDER_COLOR = '#ccc'
const WHEEL_COLOR_FRONT = '#ff2800'
const WHEEL_COLOR_BACK = '#fca311'

const WHEEL_OUTLINE_WIDTH = 10
const WHEEL_OUTLINE_BORDER_WIDTH = 2

const WheelBack = () => <Circle x={WHEEL_CENTER.X} y={WHEEL_CENTER.Y} radius={RADIUS} fill={WHEEL_COLOR_BACK} />

const WheelCenter = () => (
  <Circle
    x={WHEEL_CENTER.X}
    y={WHEEL_CENTER.Y}
    radius={WHEEL_CENTER_RADIUS}
    fill={WHEEL_COLOR_BACK}
    stroke={WHEEL_COLOR_FRONT}
    strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
  />
)

const WheelFront = () => {
  const range = new Array(COUNT).fill(0)

  return (
    <>
      {range.map((_, idx) => (
        <WheelFrontArc key={idx} start={START_DEG + (idx * 2 + 1) * DEG} />
      ))}
    </>
  )
}

const WheelFrontArc = ({ start }: { start: number }) => {
  const angle = {
    start: start,
    end: start + DEG
  }
  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()
          context.moveTo(WHEEL_CENTER.X, WHEEL_CENTER.Y)
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS, angle.start, angle.end, false)
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        fill={WHEEL_COLOR_FRONT}
      />
    </>
  )
}

const WheelOutline = () => {
  return (
    <>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS, 0, 2 * Math.PI, false)
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS + WHEEL_OUTLINE_WIDTH, 0, 2 * Math.PI, false)
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        stroke={WHEEL_COLOR_FRONT}
        strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS + WHEEL_OUTLINE_WIDTH / 2, 0, 2 * Math.PI, false)
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        stroke={WHEEL_BORDER_COLOR}
        strokeWidth={WHEEL_OUTLINE_WIDTH}
      />
    </>
  )
}

export default function Wheel() {
  return (
    <>
      <WheelBack />
      <WheelFront />
      <WheelCenter />
      <WheelOutline />
    </>
  )
}
