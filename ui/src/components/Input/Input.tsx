import React from 'react'
import style from './style.scss'

const PLACEHOLDER = '感恩讚乾爹乾媽'

interface Props {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  value?: any
  type?: string
  label?: string
  placeholder?: string
}

export default function Input({
  name,
  error,
  value,
  type = 'text',
  placeholder = PLACEHOLDER,
  label,
  onChange
}: Props) {
  return (
    <div className={style.inputContainer}>
      {label && <label>{label}</label>}
      <div className={style.input}>
        <input name={name} type={type} value={value || ''} onChange={(e) => onChange(e)} placeholder={placeholder} />
        {error && <div className={style.error}>{error}</div>}
      </div>
    </div>
  )
}
