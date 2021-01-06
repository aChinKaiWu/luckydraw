/* eslint-disable  @typescript-eslint/no-empty-function */
import { createContext } from 'react'

interface AwardContext {
  mockData: ReadonlyArray<boolean>
  handleGetWinner: () => void
}

export default createContext<AwardContext>({
  mockData: [],
  handleGetWinner: () => {}
})
