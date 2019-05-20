import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect } from 'react-router-dom'

const GET_CHATS = gql`
  query chats {
    chats {
      id,
      title,
      users {
        id,
        email,
        username,
      }
    }
  }
`
class Chats extends Component {
  render() {
    return (
      <Query query={GET_CHATS}>
        {(props) => {
          const { loading, error, data, client } = props
          if (loading) return <div>Loading</div>
          if (error) {
            if (error.message === 'GraphQL error: jwt expired') {
              const cache = client.cache;
              cache.writeData({ data: { isLoggedIn: false }})
              localStorage.removeItem('token')
              return (
                <Redirect to="/signin" />
              )
            }
            return console.log(error)
          }

          let renderChat
          if (data) {
            const { chats } = data
            renderChat = chats.map((chat, b)=> {
              return (
                <div class="chats-div">
                  <button className="chat-btn" key={chat.id} id={chat.id} onClick={() => console.log('chat click')}>{chat.title}</button>
                </div>
              )
            })
          }
          return (
            <div>
              <div className='box-header'>
                <h3>Chats</h3>
              </div>
              {renderChat}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Chats
