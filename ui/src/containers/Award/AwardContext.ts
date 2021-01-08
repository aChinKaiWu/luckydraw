/* eslint-disable  @typescript-eslint/no-empty-function */
import { createContext } from 'react'
import { AwardData } from '@src/__generated__/AwardData'

interface AwardContext {
  handleGetWinner: (award: AwardData) => void
}

export default createContext<AwardContext>({
  handleGetWinner: () => {}
})
