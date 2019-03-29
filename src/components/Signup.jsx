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
      <div>
        <div>
          <h3>Sign Up</h3>
        </div>
        <div>
          <form>
            <div>
              <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChange.bind(this)} />
            </div>
            <div>
              <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this)} />
            </div>
            <div>
              <input type='text' name='email' placeholder='you@domain.com' value={this.state.email} onChange={this.handleChange.bind(this)} />
            </div>
            <div>
              <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
            </div>
            <div>
              <input type='button' name='signup-btn' value='Submit' onClick={this.handleSubmit.bind(this)} />
            </div>
          </form>
        </div>
        <div>
          <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
        </div>
      </div>
    )
  }
}

export default Signup
