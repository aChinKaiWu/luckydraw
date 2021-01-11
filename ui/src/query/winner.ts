import { gql } from '@apollo/client'

export const CHOOSE_WINNER = gql`
  mutation ChooseWinner($awardId: String) {
    #not define yet
    findWinner(awardId: $awardId) {
      id
      name
    }
  }
`
