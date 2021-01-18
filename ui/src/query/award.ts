import { gql } from '@apollo/client'

const AwardFragment = {
  detail: gql`
    fragment AwardData on Award {
      content
      id
      price
      provider
      winner
    }
  `
}

export const AWARD_LIST_QUERY = gql`
  query AwardsList {
    awards {
      ...AwardData
    }
  }
  ${AwardFragment.detail}
`

export const CUR_AWARD_QUERY = gql`
  query GetCurrentAward {
    curAward @client {
      ...AwardData
    }
  }
  ${AwardFragment.detail}
`

export const GIVE_UP_AWARD_QUERY = gql`
  mutation GiveUpAward($awardId: ID!) {
    giveUpAward(awardId: $awardId) {
      ...AwardData
    }
  }
  ${AwardFragment.detail}
`

export const ADD_AWARD = gql`
  mutation CreateAward($content: String!, $price: Int!, $provider: String) {
    addAward(content: $content, price: $price, provider: $provider) {
      ...AwardData
    }
  }
  ${AwardFragment.detail}
`
