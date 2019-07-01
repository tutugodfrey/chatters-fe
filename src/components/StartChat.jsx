import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const UPDATE_CHATS = gql`
  query UpdateChats {
    chats {
      title,
      id,
      users {
        name,
        email
      }
    }
  }
`

const StartChat = (props) => {
  const { user, startChat: START_CHAT } = props;
  return (
    <Mutation
      mutation={START_CHAT}
      update={(cache, { data: { startChat }}) => {
        const { chats } = cache.readQuery({ query: UPDATE_CHATS})
        cache.writeQuery({
          query: UPDATE_CHATS,
          data: { chats: chats.concat([startChat])}
        })
      }}
    >
      {(StartChat, {loading, error, data, client }) => {
        let name;
        if (data ) {
          // console.log(data, 'data chat', client, 'client')
        }
        return (
          <div className="users">
            <form onSubmit={e => {
              e.preventDefault();
              StartChat({ variables: { title: name.value, userIds:[name.id]}});
              name;
              }}>
              <div>
                <input ref={node => (name = node)} id={user.id} defaultValue={user.name}/>
                <button type="submit">Start chat</button>
              </div>
            </form>
            </div>  
          )
      }}       
    </Mutation>
  );
}

export default StartChat
