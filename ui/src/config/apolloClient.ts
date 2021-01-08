import { ApolloClient, gql, InMemoryCache, makeVar } from '@apollo/client'
// import { AwardData } from '@src/_generated_/AwardData'
import { AwardData } from '@src/__generated__/AwardData'

export const awardVar = makeVar<AwardData | undefined>(undefined)
export const chosenOneVar = makeVar<any>({ id: '12345' })

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        curAward: {
          read() {
            return awardVar()
          }
        },
        winner: {
          read() {
            return chosenOneVar()
          }
        }
      }
    }
  }
})

const typeDefs = gql`
  extend type Query {
    curAward: Award
    # Candidate not defined yet.
    winner: Candidate
  }
`

const client = new ApolloClient({
  uri: 'http://localhost:4000/api',
  cache,
  typeDefs
})

export default client
