import React from 'react'
import { Circle, Shape } from 'react-konva'

const COUNT = 8
const START_DEG = -0.7
const DEG = (2 / (COUNT * 2)) * Math.PI

const PADDING = 50
const RADIUS = 150
const WHEEL_CENTER_RADIUS = 40
const WHEEL_OUTLINE_WIDTH = 15
const WHEEL_OUTLINE_BORDER_WIDTH = WHEEL_CENTER_RADIUS / 10
const WHEEL_CENTER = {
  X: PADDING + RADIUS,
  Y: PADDING + RADIUS
}

const WHEEL_OUTLINE_COLOR = '#d21404'
const WHEEL_OUTLINE_BORDER_COLOR = '#d21404'
const WHEEL_COLOR_FRONT = '#ff2800'
const WHEEL_COLOR_BACK = '#fca311'

const WHEEL_CENTER_SHADOW_BLUR = 100
const WHEEL_CENTER_SHADOW_COLOR = '#000'

const WheelBack = () => <Circle x={WHEEL_CENTER.X} y={WHEEL_CENTER.Y} radius={RADIUS} fill={WHEEL_COLOR_BACK} />

const WheelCenter = () => (
  <Circle
    x={WHEEL_CENTER.X}
    y={WHEEL_CENTER.Y}
    radius={WHEEL_CENTER_RADIUS}
    fill={WHEEL_COLOR_BACK}
    stroke={WHEEL_COLOR_FRONT}
    strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
    shadowBlur={WHEEL_CENTER_SHADOW_BLUR}
    shadowColor={WHEEL_CENTER_SHADOW_COLOR}
  />
)

const WheelFront = () => {
  const range = new Array(COUNT).fill(0)

  return (
    <>
      {range.map((_, idx) => (
        <WheelFrontArc key={idx} start={START_DEG + idx * 2 * DEG} />
      ))}
    </>
  )
}

const WheelFrontArc = ({ start }: { start: number }) => {
  const startAngle = start
  const endAngle = start + DEG

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath()
        context.moveTo(WHEEL_CENTER.X, WHEEL_CENTER.Y)
        context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS, startAngle, endAngle, false)
        context.closePath()
        context.fillStrokeShape(shape)
      }}
      fill={WHEEL_COLOR_FRONT}
    />
  )
}

const WheelBackGround = () => {
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
        stroke={WHEEL_OUTLINE_BORDER_COLOR}
        strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
        shadowBlur={WHEEL_CENTER_SHADOW_BLUR}
        shadowColor={WHEEL_CENTER_SHADOW_COLOR}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS + WHEEL_OUTLINE_WIDTH / 2, 0, 2 * Math.PI, false)
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        stroke={WHEEL_OUTLINE_COLOR}
        strokeWidth={WHEEL_OUTLINE_WIDTH}
        shadowBlur={WHEEL_CENTER_SHADOW_BLUR}
        shadowColor={WHEEL_CENTER_SHADOW_COLOR}
      />
    </>
  )
}

export default function Wheel() {
  return (
    <>
      <WheelBackGround />
      <WheelBack />
      <WheelFront />
      <WheelCenter />
    </>
  )
}
