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
  renderLinkButton() {
    const button = document.getElementById('collapse-btn')
    console.log(button)
    button.addEventListener('click', () => {
      const navBar = document.getElementById('nav-bar2')
      const classname = navBar.getAttribute('class')
      if (classname === 'hide') {
        navBar.setAttribute('class', 'show show-nav-menu')
      } else {
        navBar.setAttribute('class', 'hide')
      }
    })
  }
  componentDidMount() {
    this.renderLinkButton()
  }
  render() {
    return (
      <Query query={checkStatus}>
        {
          ({loading, error, data }) => {
           return (
             <div className="container">
                <div id="showcase">
                  <div className="bg-overlay">
                    <div id="nav-bar">
                      <div className="nav-item"><Link className="link" to='/signup'>Signup</Link></div>
                      <div className="nav-item"><Link className="link" to='/signin'>Signin</Link></div>
                      <button id="collapse-btn">
                        <span className="marker">
                          <hr />
                        </span>
                        <span className="marker">
                          <hr />
                        </span>
                        <span className="marker">
                          <hr />
                        </span>
                      </button>
                    </div>
                    <div id="nav-bar2" className="hide">
                      <div className="nav-items"><Link className="links" to='/signup'>Signup</Link></div>
                      <div className="nav-items"><Link className="links" to='/signin'>Signin</Link></div>
                    </div>
                    <div id="caption">
                      <h1 className="text-center">Chatters</h1>
                      <p className="text-center">Connect with friends and communicate seamlessly</p>
                    </div>
                    <div id="login1-form-container">
                      <form>
                        <div id="login1">
                          <div className="flex-item">
                            <input type='text' name='username' className="form-control" placeholder='username' />
                          </div>
                          <div className="flex-item">
                            <input type='password' name='password' className="form-control" placeholder='password' />
                          </div>
                          <div className="flex-item">
                            <input type='button' name='singin' className="btn-sm bg-secondary" value='Sign In' />
                          </div>
                        </div>
                      </form>
                    </div>
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
