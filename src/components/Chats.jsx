import React, { Component } from 'react'
import { Query, Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

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
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
    }
  }

  deleteChat(event) {
    const chatId = event.target.id;
    this.props.client.mutate({
      mutation: gql`
        mutation deleteChat($chatId: ID!) {
          deleteChat(chatId: $chatId)
        }
      `,
      variables: {
        chatId
      }
    });
    this.state.chats.map((chat, index) => {
      if (chat.id === event.target.id) {
        return this.state.chats.splice(index, 1)
      }
    });
  }

  render() {
    return (
      <Query query={GET_CHATS} fetchPolicy="network-only">
        {(props) => {
          const { loading, data, client } = props
          let chats;
          if (data && !data.chats) {
             const data = client.cache.readQuery({ query: gql`
            query getChats {
              chats {
                id,
                title,
              }
            }`})

            chats = data.chats
          }
          if (loading) return <div>Loading</div>
          let renderChat
          chats = data.chats || chats
          if (chats) {
            this.state.chats = chats;
            renderChat = this.state.chats.map((chat, b)=> {
              return (
                <Mutation mutation={ACTIVE_CHAT} variables={{ id: chat.id }} key={chat.id}>
                  { activeChat => {
                    return (
                      <div className="chats-div" key={chat.id}>
                        <button className="chat-btn" id={chat.id} onClick={activeChat}>{chat.title}</button>
                        <div><button type="button" id={chat.id} onClick={this.deleteChat.bind(this)}>delete</button></div>
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

export default withApollo(Chats);
