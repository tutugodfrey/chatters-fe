import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signin extends Component {
  render() {
    return (
      <div className="container" id="signin-page">
        <div className="go-back-home">
          <Link to="/">Back</Link>
        </div>
        <div className="form-container">
          <div>
            <h3>Sign In</h3>
          </div>
          <div id="signin-form">
            <form>
              <div className="form-group">
                <label>username</label>
                <input
                  type='text'
                  name='username'
                  className="form-control"
                  placeholder='username'
                />
              </div>
              <div className="form-group">
                <label>password</label>
                <input
                  type='password'
                  name='password'
                  className="form-control"
                  placeholder='password'
                />
              </div>
              <div className="form-group">
                <input
                  type='button'
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
      </div>
    )
  }
}

export default Signin
