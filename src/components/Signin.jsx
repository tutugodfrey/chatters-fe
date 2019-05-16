import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import SignInForm from './SignInForm.jsx'

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
      id
      name,
      email,
      username,
      chats {
        id,
        title,
        users {
          id,
          name,
          email
        }
      }
      token,
      isAdmin
    }
  }
`
class Signin extends Component {
  render() {
    return (
      <div className="container" id="signin-page">
        <div className="go-back-home">
          <Link to="/">Back</Link>
        </div>
        <SignInForm signIn={ SIGN_IN } />
      </div>
    )
  }
}

export default Signin
