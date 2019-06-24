import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Redirect, Link } from 'react-router-dom'

const GET_CHATS = gql`
  query chats {
    chats {
      id,
      title,
      messages {
        id,
        body,
        createdAt
      }
      users {
        id,
        email,
        username,
      }
    }
  }
`
const ACTIVE_CHAT = gql`
  mutation ActiveChat($id: ID) {
    activeChat(id: $id) @client
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
          }

          let renderChat
          if (data) {
            const { chats } = data
            renderChat = chats.map((chat, b)=> {
              return (
                <Mutation mutation={ACTIVE_CHAT} variables={{ id: chat.id }}>
                  { activeChat => {
                    return (
                      <div class="chats-div">
                        <Link className="chat-btn" key={chat.id} id={chat.id} onClick={activeChat}>{chat.title}</Link>
                      </div>
                    )
                  }}
                </Mutation>
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
