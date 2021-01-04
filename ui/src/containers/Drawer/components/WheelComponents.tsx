import React from 'react'
import { Circle, Shape } from 'react-konva'

const COUNT = 8
const START_DEG = -0.7
const DEG = (2 / (COUNT * 2)) * Math.PI

const MARGIN = 20
const NEEDLE_HEIGHT = 50
const PADDING = NEEDLE_HEIGHT + MARGIN
const RADIUS = 150
const WHEEL_CENTER_RADIUS = 40
const WHEEL_OUTLINE_WIDTH = 15
const WHEEL_OUTLINE_BORDER_WIDTH = WHEEL_CENTER_RADIUS / 10
const WHEEL_CENTER = {
  X: PADDING + RADIUS,
  Y: PADDING + RADIUS
}
const NEEDLE_WIDTH = WHEEL_CENTER_RADIUS
const NEEDLE_RADIUS = NEEDLE_WIDTH / 2
const NEEDLE_CENTER_RADIUS = NEEDLE_RADIUS / 3
const NEEDLE_BORDER_WIDTH = WHEEL_OUTLINE_BORDER_WIDTH
const NEEDLE_CENTER = {
  X: WHEEL_CENTER.X,
  Y: NEEDLE_RADIUS + MARGIN
}
const NEEDLE_TIP = {
  X: WHEEL_CENTER.X,
  Y: NEEDLE_RADIUS + MARGIN + NEEDLE_HEIGHT
}

const WHEEL_OUTLINE_COLOR = '#ff2800'
const WHEEL_OUTLINE_BORDER_COLOR = '#d21404'
const WHEEL_COLOR_FRONT = '#ff2800'
const WHEEL_COLOR_BACK = '#fca311'
const NEEDLE_COLOR = '#fff299'
const NEEDLE_BORDER_COLOR = '#ffd901'

const WHEEL_CENTER_SHADOW_BLUR = 100
const WHEEL_CENTER_SHADOW_COLOR = '#000'
const WHEEL_OUTLINE_SHADOW_BLUR = 20
const WHEEL_OUTLINE_SHADOW_COLOR = '#000'
const NEEDLE_SHADOW_BLUR = 15
const NEEDLE_SHADOW_COLOR = '#000'

export const WheelNeedle = () => (
  <Shape
    sceneFunc={(context, shape) => {
      context.beginPath()
      context.moveTo(NEEDLE_CENTER.X - NEEDLE_RADIUS, NEEDLE_CENTER.Y)
      context.arc(NEEDLE_CENTER.X, NEEDLE_CENTER.Y, NEEDLE_RADIUS, Math.PI, 2 * Math.PI, false)
      context.lineTo(NEEDLE_TIP.X, NEEDLE_TIP.Y)
      context.lineTo(NEEDLE_TIP.X - NEEDLE_RADIUS, NEEDLE_CENTER.Y)
      context.moveTo(NEEDLE_CENTER.X - NEEDLE_CENTER_RADIUS, NEEDLE_CENTER.Y)
      context.closePath()
      context.fillStrokeShape(shape)
    }}
    fill={NEEDLE_COLOR}
    stroke={NEEDLE_BORDER_COLOR}
    strokeWidth={NEEDLE_BORDER_WIDTH}
    shadowBlur={NEEDLE_SHADOW_BLUR}
    shadowColor={NEEDLE_SHADOW_COLOR}
  />
)

export const WheelBack = () => <Circle x={WHEEL_CENTER.X} y={WHEEL_CENTER.Y} radius={RADIUS} fill={WHEEL_COLOR_BACK} />

export const WheelCenter = () => (
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

export const WheelFront = () => {
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

export const WheelBackGround = () => {
  return (
    <>
      <Circle
        x={WHEEL_CENTER.X}
        y={WHEEL_CENTER.Y}
        radius={RADIUS + WHEEL_OUTLINE_WIDTH + WHEEL_OUTLINE_BORDER_WIDTH}
        fill={WHEEL_OUTLINE_BORDER_COLOR}
        shadowBlur={WHEEL_OUTLINE_SHADOW_BLUR}
        shadowColor={WHEEL_OUTLINE_SHADOW_COLOR}
      />
      <Shape
        sceneFunc={(context, shape) => {
          context.moveTo(RADIUS + WHEEL_OUTLINE_WIDTH, RADIUS + WHEEL_OUTLINE_WIDTH)
          context.beginPath()
          context.arc(WHEEL_CENTER.X, WHEEL_CENTER.Y, RADIUS + WHEEL_OUTLINE_BORDER_WIDTH, 0, 2 * Math.PI, false)
          context.arc(
            WHEEL_CENTER.X,
            WHEEL_CENTER.Y,
            RADIUS + WHEEL_OUTLINE_WIDTH + WHEEL_OUTLINE_BORDER_WIDTH * 1.5,
            0,
            2 * Math.PI,
            false
          )
          context.moveTo(RADIUS + WHEEL_OUTLINE_WIDTH, RADIUS + WHEEL_OUTLINE_WIDTH)
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
          context.arc(
            WHEEL_CENTER.X,
            WHEEL_CENTER.Y,
            RADIUS + WHEEL_OUTLINE_WIDTH / 2 + WHEEL_OUTLINE_BORDER_WIDTH,
            0,
            2 * Math.PI,
            false
          )
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        stroke={WHEEL_OUTLINE_COLOR}
        strokeWidth={WHEEL_OUTLINE_WIDTH}
      />
    </>
  )
}
