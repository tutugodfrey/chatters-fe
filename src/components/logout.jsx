import React from 'react'
import { Query, ApolloConsumer } from 'react-apollo'
import { Link, Redirect, withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

const LOG_OUT = gql`
  query logOut {
    logOut @client(always: true)
  }
`
const logOut = (event, props) => {
  event.preventDefault()
  localStorage.removeItem('token')
  props.history.push('/signin')
}
const LogOut = withRouter((props) => {
    return (
      <div>
        <button id="logout-btn" onClick={(event) => logOut(event, props)}>
          Log Out
        </button>
      </div>
    )
})

export default LogOut
