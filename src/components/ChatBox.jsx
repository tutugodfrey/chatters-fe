import React, { Component } from 'react'
import {Query,  Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ACTIVE_CHAT = gql`
  query activeChat {
    activeChat @client(always: true) {
      id,
      title,
      messages {
        id,
        body,
        createdAt
      },
    }
  }
` 
const SEND_MESSAGE = gql`
  mutation sendMessage($body: String!, $chatId: ID!) {
    sendMessage(body: $body, chatId: $chatId) {
      id,
      body,
      chat {
        id
        title
      }
      createdAt
    }
  }
`
class ChatBox extends Component {
  render() {
    function formatDate(dateString) {
      const date =  new Date(parseInt(dateString))
      return {
        hour: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      }
    }
    return (
      <Query query={ACTIVE_CHAT}>
        {(props) => {
          const {data} = props
          let chatTitle = ''
          let chatId
          let chatMessages = []
          if (data && data.activeChat ) {
            const { id, title, messages } = data.activeChat
            chatTitle = title
            chatId = id
            chatMessages = messages
          }
          let renderMessages = '' 
          renderMessages = chatMessages.map(message => {
            const date = formatDate(message.createdAt)
            const messages = <div class="message-box">
              <div>{message.body}</div>
              {/* show chat tie */}
              <div className="messages"><span>{date.hour}:{date.minutes}:{date.seconds}</span></div>
            </div>
            return messages
          })
          return (
            <div className="chatbox">
            <div className="box-header">
              <h3>Chats - {chatTitle}</h3>
            </div> 
            <Mutation mutation={SEND_MESSAGE}>
              {(sendMessage, props) => {
                let body

                const { error, loading, data } = props
                if (error) return console.log(error)
                if (loading) return <div><strong>Loading</strong></div>
                if (data) {
                  // update the local message array
                  const message  = data.sendMessage
                   chatMessages = chatMessages.push(message)
                }
                return (
                  <div className="chat-div">
                    <div className="messages-div">
                      { renderMessages }
                    </div>
                    <div className="chat-form-div">
                      <form onSubmit={ e => {
                        e.preventDefault()
                        sendMessage({
                          variables: {
                            body: body.value,
                            chatId: body.id,
                          }
                        })
                      }}>
                        <div>
                          <div>
                            <textarea
                            cols="40"
                            rows="1"
                            id={chatId}
                            placeholder="Type message"
                            ref={node => body = node}
                            className="b-radius"
                            ></textarea>
                          </div>
                          <div>
                            <button className="bg-success b-radius">Send</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }}
            </Mutation>
          </div>
          )
        }}
      </Query>
    )
  }
}

export default ChatBox
