import React from 'react'
import ReactDom from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Routes from './routes/Routes.jsx'
import './css/style.scss'

let backendHost = 'http://localhost:5000/graphql'

const client = new ApolloClient({
  uri: backendHost
})

const App = () => {
  console.log(backendHost)
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
