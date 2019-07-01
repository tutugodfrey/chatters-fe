import React from 'react'
import { Mutation } from 'react-apollo'
import { Link, Redirect } from 'react-router-dom'

const SignInForm = (props) => {
  let email
  let password
  const { signIn, typing, handleChange, doneTyping } = props

  return (
    <Mutation mutation={signIn}>
      { (signIn, props) => {
        const { error, loading, data } = props
        let loginError = '';
        const errorMsg = 'GraphQL error: Incorrect email or password. Please try again.'
        const message = 'Incorrect email or password. Please check email and password.'
        if (loading) return <div>Loading...</div>
        if (error) {
          if (error.message === errorMsg) {
            loginError = message
          } else {
            return (
              <div>
                <p className="text-white">An error has occured</p>
              </div>
            )
          }
        }
        if (data) {
          loginError = ''
          const { cache } = props.client;
          const { token } = data.signIn
          localStorage.setItem('token', token);

          // save user data to local cache
          cache.writeData({ data: {
            user: data.signIn,
            isLoggedIn: !!localStorage.getItem('token')
          } });
          return <Redirect to="/dashboard"/>
        } 
        return (
          <div className="form-container">
            <div>
              <h3>Sign In</h3>
            </div>
            <div id="signin-form">
              <p>{typing ? '' : loginError}</p>
              <form onSubmit={ e => {
                e.preventDefault()
                signIn({ variables: { 
                  email: email.value,
                  password: password.value,
                } });
                doneTyping()
                email.value = "";
                password.value = "";
              }}>
                <div className="form-group">
                  <label>email</label>
                  <input
                    type='text'
                    name='email'
                    onChange={handleChange}
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
                    onChange={handleChange}
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
      }}
    </Mutation>
  )
}

export default SignInForm
