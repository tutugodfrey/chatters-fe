import React from 'react'
import { Link } from 'react-router-dom'
import { Mutation } from 'react-apollo'

const SignUpForm = (props) => {
  let name;
  let username;
  let email;
  let password;
  const {  signup } = props
  return (
    <Mutation mutation={signup}>
      {(signUp, { data, loading, error }) => {
        if (error) {
          return (
            <div>
              <p className="text-white">An error has occurred</p>
            </div>
          )
        } else if (loading) {
          return (
            <div>
              <p className="text-white">Loading...</p>     
            </div>
          )
        } else if(data) {
          const { name, token } = data.signUp

          // store token in localstorage
          localStorage.setItem('token', token)
          return (
            <div>
              <p className="text-white">Thank you {name} for signing up. Now you can enjoy chatting with friend</p>
            </div>
          )
        } else {
          return (
              <div className="form-container">
                <div>
                  <h3>Sign Up</h3>
                </div>
                <div id="signup-form">
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      signUp({ variables: { 
                        name: name.value,
                        username: username.value,
                        email: email.value,
                        password: password.value,
                      } });
    
                      name.value = "";
                      username.value = "";
                      email.value = "";
                      password.value = "";
                    }}
                  >
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type='text'
                        className="form-control"
                        placeholder='Name'
                        ref={node => name = node}
                      />
                    </div>
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type='text'
                        className="form-control"
                        placeholder='Username'
                        ref={node => username = node}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type='text'
                        className="form-control"
                        placeholder='you@domain.com'
                        ref={node => email = node}
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label> 
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
                          name='signup-btn'
                          value='Submit'
                        />
                      </div>
                  </form>
                </div>
                <div>
                  <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                </div>
            </div>
          )
        }
      }}
    </Mutation>
  );
};

export default SignUpForm;
