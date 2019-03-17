import React from 'react'
import ReactDom from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import CheckStatus from './CheckStatus'
let backendHost
if (process.env.NODE_ENV == 'development') {
  backendHost = 'http://localhost:5000/graphql'
}
const client = new ApolloClient({
  uri: backendHost
})

const App = () => {
  console.log(backendHost)
    return (
      <ApolloProvider client={client}>
        <CheckStatus />
      </ApolloProvider>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
