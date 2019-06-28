import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'
import SignUpForm from './SignUpForm';


const SIGN_UP = gql`
  mutation SignUp($name: String!, $email: String!, $username: String!, $password: String!) {
    signUp(name: $name, email: $email, username: $username, password: $password) {
      name,
      email,
      username,
      token,
    }
  }
`;

class SignUp extends Component {
  render() {
    return (
      <div className="container" id="signup-page">
        <div className="go-back-home">
          <Link to="/">Back</Link>
        </div>
        <SignUpForm signup={ SIGN_UP }/>
      </div>
    )
  }
};

export default SignUp;
