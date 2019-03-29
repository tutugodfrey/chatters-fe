import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signin extends Component {
  render() {
    return (
      <div>
          <div>
            <h3>Sign In</h3>
          </div>
        <form>
          <div>
            <input type='text' name='username' placeholder='username' />
          </div>
          <div>
            <input type='password' name='password' placeholder='password' />
          </div>
          <div>
            <input type='button' name='signin-btn' value='Sign In' />
          </div>
        </form>
        <div>
          <p>Don't have an account? <Link to='/signup'>Sign up here</Link></p>
        </div>
      </div>
    )
  }
}

export default Signin
