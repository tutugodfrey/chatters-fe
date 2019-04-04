import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {
  constructor () {
    super()
    this.state = {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  }

  handleChange (event) {
    const { name, value } = event.target
    this.setState({
      ...this.state,
      [name]: value
    })
  }

  handleSubmit(event) {
    console.log(this.state)
  }

  render() {
    return (
      <div className="container" id="signup-page">
        <div id="abc">
          <div>
            <h3>Sign Up</h3>
          </div>
          <div id="signup-form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input
                  type='text'
                  name='name'
                  className="form-control"
                  placeholder='Name'
                  value={this.state.name}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type='text'
                  name='username'
                  className="form-control"
                  placeholder='Username'
                  value={this.state.username}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type='text'
                  name='email'
                  className="form-control"
                  placeholder='you@domain.com'
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label>Password</label> 
                <input
                  type='password'
                  name='password'
                  className="form-control"
                  placeholder='password'
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <input
                  type='button'
                  name='signup-btn'
                  value='Submit'
                  onClick={this.handleSubmit.bind(this)}
                />
              </div>
            </form>
          </div>
          <div>
            <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Signup
