import React, { RefObject } from 'react'
import { Layer as LayerType } from 'konva/types/Layer'
import { Circle, Layer, Ring, Shape } from 'react-konva'

const COUNT = 8
const START_DEG = -0.7
const DEG = (2 / (COUNT * 2)) * Math.PI

const _range = new Array(COUNT).fill(0)

const NEEDLE_HEIGHT = 75
const MARGIN = NEEDLE_HEIGHT / 2
const RADIUS = 225
const WHEEL_CENTER_RADIUS = 60
const WHEEL_OUTLINE_WIDTH = 30
const WHEEL_OUTLINE_BORDER_WIDTH = WHEEL_CENTER_RADIUS / 10
const WHEEL_CENTER = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}
const NEEDLE_WIDTH = WHEEL_CENTER_RADIUS
const NEEDLE_RADIUS = NEEDLE_WIDTH / 2
const NEEDLE_BORDER_WIDTH = WHEEL_OUTLINE_BORDER_WIDTH
const NEEDLE_CENTER = {
  x: WHEEL_CENTER.x,
  y: WHEEL_CENTER.y - RADIUS - MARGIN
}
const NEEDLE_TIP = {
  x: WHEEL_CENTER.x,
  y: WHEEL_CENTER.y - RADIUS + MARGIN
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

const degreeToRadian = (degree: number) => (degree / 180) * Math.PI
const getCoordinateOnCircle = (degree: number, radius: number, center: { x: number; y: number } = { x: 0, y: 0 }) => {
  const radian = degreeToRadian(degree)
  return { x: center.x + radius * Math.cos(radian), y: center.y + radius * Math.sin(radian) }
}

export const WheelNeedle = () => {
  const start = getCoordinateOnCircle(150, NEEDLE_RADIUS, NEEDLE_CENTER)

  return (
    <Layer>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath()
          context.moveTo(NEEDLE_TIP.x, NEEDLE_TIP.y)
          context.lineTo(start.x, start.y)
          context.arc(
            NEEDLE_CENTER.x,
            NEEDLE_CENTER.y,
            NEEDLE_RADIUS,
            (1 - 60 / 360) * Math.PI,
            (2 + 60 / 360) * Math.PI,
            false
          )
          context.lineTo(NEEDLE_TIP.x, NEEDLE_TIP.y)
          context.closePath()
          context.fillStrokeShape(shape)
        }}
        fill={NEEDLE_COLOR}
        stroke={NEEDLE_BORDER_COLOR}
        strokeWidth={NEEDLE_BORDER_WIDTH}
        shadowBlur={NEEDLE_SHADOW_BLUR}
        shadowColor={NEEDLE_SHADOW_COLOR}
      />
    </Layer>
  )
}

export const WheelCenter = () => (
  <Layer>
    <Circle
      x={WHEEL_CENTER.x}
      y={WHEEL_CENTER.y}
      radius={WHEEL_CENTER_RADIUS}
      fill={WHEEL_COLOR_BACK}
      stroke={WHEEL_COLOR_FRONT}
      strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
      shadowBlur={WHEEL_CENTER_SHADOW_BLUR}
      shadowColor={WHEEL_CENTER_SHADOW_COLOR}
    />
  </Layer>
)

export const WheelBack = () => (
  <Layer>
    <Ring
      x={WHEEL_CENTER.x}
      y={WHEEL_CENTER.y}
      innerRadius={RADIUS}
      outerRadius={RADIUS + WHEEL_OUTLINE_WIDTH}
      fill={WHEEL_OUTLINE_BORDER_COLOR}
      stroke={WHEEL_OUTLINE_COLOR}
      strokeWidth={WHEEL_OUTLINE_BORDER_WIDTH}
      shadowBlur={WHEEL_OUTLINE_SHADOW_BLUR}
      shadowColor={WHEEL_OUTLINE_SHADOW_COLOR}
    />
    <Circle
      x={WHEEL_CENTER.x}
      y={WHEEL_CENTER.y}
      radius={RADIUS}
      fill={WHEEL_COLOR_BACK}
      shadowBlur={WHEEL_OUTLINE_SHADOW_BLUR}
      shadowColor={WHEEL_OUTLINE_SHADOW_COLOR}
    />
  </Layer>
)

export const WheelFront = ({ layerRef }: { layerRef: RefObject<LayerType> }) => {
  return (
    <Layer ref={layerRef} x={WHEEL_CENTER.x} y={WHEEL_CENTER.y}>
      {_range.map((_, idx) => (
        <WheelFrontArc key={idx} start={START_DEG + idx * 2 * DEG} />
      ))}
    </Layer>
  )
}

const WheelFrontArc = ({ start }: { start: number }) => {
  const startAngle = start
  const endAngle = start + DEG

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath()
        context.moveTo(0, 0)
        context.arc(0, 0, RADIUS, startAngle, endAngle, false)
        context.closePath()
        context.fillStrokeShape(shape)
      }}
      fill={WHEEL_COLOR_FRONT}
    />
  )
}
