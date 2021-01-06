import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'

import App from './containers/App'
import Client from './config/apolloClient'

function Landing() {
  return (
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  )
}

ReactDOM.render(<Landing />, document.getElementById('root'))
