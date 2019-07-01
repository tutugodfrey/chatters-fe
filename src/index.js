import React from 'react'
import ReactDom from 'react-dom'
import  { ApolloClient,  ApolloLink, InMemoryCache, HttpLink } from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { from } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { logOut } from './helpers/requestHelpers'
import { persistCache } from 'apollo-cache-persist'

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

const logOutLink = onError(({ response }) => {
  const { message }  = response.errors[0]
  console.log({ authError: message })
  if (
    message === 'jwt expired'
    || message === 'invalid signature'
    || message === 'invalid token'
  ) {
    logOut(cache)
  }
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
    activeChat: { name: ''},
    chats: [],
  }
})

const client = new ApolloClient({
  link: from([
    authLink,
    logOutLink,
    httpLink
  ]),
  cache,
  typeDefs,
  resolvers,
})

const App = () => {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    )
}

// const setupAndRender = async () => {
//   persistCache({
//     cache,
//     storage: window.localStorage
//   })
  ReactDom.render(<App />, document.getElementById('app'))
// }

// setupAndRender()

