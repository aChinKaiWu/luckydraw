import { gql } from '@apollo/client'

const CandidateFragment = {
  detail: gql`
    fragment CandidateData on Candidate {
      id
      name
      isWinner
    }
  `
}

export const CANDIDATE_LIST_QUERY = gql`
  query CandidatesList {
    candidates {
      ...CandidateData
    }
  }
  ${CandidateFragment.detail}
`
