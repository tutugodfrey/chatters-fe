import React from 'react'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

const SignInForm = (props) => {
  let email
  let password
  const { signIn } = props

  return (
    <Mutation mutation={signIn}>
      {(signIn, { error, loading, data}) => {
        if (error) {
          return (
            <div>
              <p className="text-white">An error has occured</p>
            </div>
          )
        } else if (data) {
          console.log(data.signIn)
          const { name, email, token } = data.signIn
          localStorage.setItem('token', token)
          return (
            <div>
              <p>Welcome back {name}</p>
            </div>
          )
        } else {
          return (
          <div className="form-container">
            <div>
              <h3>Sign In</h3>
                     </div>
            <div id="signin-form">
              <form onSubmit={ e => {
                e.preventDefault()
                signIn({ variables: { 
                  email: email.value,
                  password: password.value,
                } });

                email.value = "";
                password.value = "";
              }}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    type='text'
                    name='email'
                    className="form-control"
                    placeholder='email'
                    ref={node => email = node}
                  />
                </div>
                <div className="form-group">
                  <label>password</label>
                  <input
                    type='password'
                    name='password'
                    className="form-control"
                    placeholder='password'
                    ref={node => password = node}
                  />
                </div>
                <div className="form-group">
                  <input
                    type='submit'
                    name='signin-btn'
                    value='Sign In'
                  />
                </div>
              </form>
              <div>
                <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
              </div>
            </div>
          </div>
          )
        }
      }}
    </Mutation>
  )
}

export default SignInForm
