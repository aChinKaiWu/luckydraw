import React from 'react'
import Input from '@src/components/Input/Input'
import style from './AwardItemStyle.scss'

enum AwardKey {
  Provider = 'provider',
  Content = 'content',
  Price = 'price'
}

export interface AwardCreationBody {
  [AwardKey.Provider]?: string
  [AwardKey.Content]?: string
  [AwardKey.Price]?: number | string
}

const DEFAULT_ERROR: AwardCreationBody = {
  [AwardKey.Content]: 'Content Error',
  [AwardKey.Price]: 'Price Error'
}

const AwardForm = ({
  values,
  errors,
  onChange
}: {
  values: AwardCreationBody | null
  errors: AwardCreationBody
  onChange: (data: AwardCreationBody) => void
}) => {
  const handleChange = (name: string, value: any) => onChange({ ...values, [name]: value })

  return (
    <div className={style.donateForm}>
      <form>
        <Input
          name={AwardKey.Provider}
          label='乾爹乾媽'
          value={values?.[AwardKey.Provider]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          name={AwardKey.Content}
          value={values?.[AwardKey.Content]}
          label='乾爹乾媽ㄉ心意'
          error={errors[AwardKey.Content]}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
        />
        <Input
          name={AwardKey.Price}
          value={values?.[AwardKey.Price]}
          label='お金'
          type='number'
          error={errors[AwardKey.Price] as string}
          onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
        />
      </form>
    </div>
  )
}

export default function AwardCreation({ onCreatAward }: { onCreatAward: (data: AwardCreationBody) => void }) {
  const [formValue, setFormValues] = React.useState<AwardCreationBody | null>(null)
  const [formErrors, setFormErrors] = React.useState<AwardCreationBody>({})

  const onDonate = () => {
    if (!formValue) {
      setFormValues({})
      return
    }

    handleSubmit()
  }

  const handleSubmit = () => {
    const error: AwardCreationBody = { ...DEFAULT_ERROR }

    Object.values(AwardKey).forEach((key) => {
      if (formValue?.[key]) delete error[key]
    })

    if (Object.values(error).length === Object.values(DEFAULT_ERROR).length) {
      setFormValues(null)
      return
    }

    setFormErrors(error)

    if (Object.values(error).length === 0 && formValue) {
      onCreatAward(formValue)
      setFormValues(null)
      return
    }
  }

  return (
    <div className={style.container}>
      <div className={formValue ? style.donateContainerCreate : style.donateContainer}>
        <div className={style.donateTitle}>
          <p>我要當乾爹</p>
          <p>我要當乾媽</p>
        </div>
        <AwardForm values={formValue} errors={formErrors} onChange={setFormValues} />
      </div>
      <div className={style.donateButton} onClick={onDonate}>
        捐 Donate 寄付
      </div>
    </div>
  )
}
