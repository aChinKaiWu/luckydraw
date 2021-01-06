import React from 'react'
import classnames from 'classnames'
import style from './style.scss'

interface ButtonProps {
  onClick?: () => void
  children: any
  className?: string
}

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button className={classnames(style.button, className)} type='button' onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
