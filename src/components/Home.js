import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
const checkStatus = gql`
{
  status
}
`
class Home extends Component {
  render() {
    return (
      <Query query={checkStatus}>
        {
          ({loading, error, data }) => {
           return (
             <div>
                <div>
                  <div><Link to='/signup'>Signup</Link></div>
                  <div><Link to='/signin'>Signin</Link></div>
                </div>
                <div>
                  <h1>Now friends are closer</h1>
                  <div>
                    <form>
                      <div>
                        <input type='text' name='username' placeholder='username' />
                      </div>
                      <div>
                        <input type='password' name='password' placeholder='password' />
                      </div>
                      <div>
                        <input type='button' name='singin' value='Sign In' />
                      </div>
                    </form>
                    </div>
                </div>
             </div>
           )
          }
        }
      </Query>
    )
  }
}

export default Home
