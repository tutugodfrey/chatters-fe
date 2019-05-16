import React from 'react'
import ReactDom from 'react-dom'
import  { ApolloClient,  ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Routes from './routes/Routes.jsx'
import { typeDefs, resolvers } from './schemas/resolvers.js'
import './css/style.scss'

const  backendHost = 'http://localhost:5000/graphql'
const httpLink = new HttpLink({
  uri: backendHost
})
const cache = new InMemoryCache();

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  operation.setContext({
    headers: {
      token: token || null
    }
  })
  return forward(operation)
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers,
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  }
})

const App = () => {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    )
}

ReactDom.render(<App />, document.getElementById('app'))
