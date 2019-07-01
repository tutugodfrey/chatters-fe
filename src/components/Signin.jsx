import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import SignInForm from './SignInForm'

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
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.doneTyping = this.doneTyping.bind(this)
    this.state = {
      typing: false
    }
  }
  handleChange(event) {
    this.setState({
      typing: true
    })
  }
  doneTyping() {
    this.setState({
      typing: false
    })
  }
  render() {
    return (
      <div className="container" id="signin-page">
        <div className="go-back-home">
          <Link to="/">Back</Link>
        </div>
        <SignInForm
          signIn={ SIGN_IN }
          handleChange={this.handleChange}
          doneTyping={this.doneTyping}
          typing={this.state.typing}
        />
      </div>
    )
  }
}

export default Signin
