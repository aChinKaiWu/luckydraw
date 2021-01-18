import { AwardData } from '../../../__generated__/AwardData'

type AwardDerived = AwardData & {
  winnerName: string
}

export default AwardDerived
