import React, { Component} from 'react'
// import People from './People.jsx'
import Chats from './Chats.jsx'
import ChatBox from './ChatBox.jsx'
import PeopleComp from './PeopleComp.jsx'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import Logout from './logout.jsx'

const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn @client(always: true)
  }
`
class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Query query={IS_LOGGED_IN} fetchPolicy="no-cache">
          {(props)  => {
            const { data } = props;
            if (data.isLoggedIn === false) return <Redirect to="/signin" />
            return (
              <div>
                <div id={'dashboard-header'}>
                  <Logout />
                </div>
                <div id="dashboard">
                  <div className="p-x" id='chats'>
                    <Chats />
                  </div>
                  <div className="p-x" id="chat-box">
                    <ChatBox />
                  </div>
                  <div className="p-x" id="start-chat">
                    <PeopleComp />
                  </div>
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Dashboard
