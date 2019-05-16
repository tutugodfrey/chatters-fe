import React from 'react'
import { Mutation } from 'react-apollo';

const StartChat = (props) => {
  const { user, startChat: START_CHAT } = props;
  return (
    <Mutation mutation={START_CHAT}>
      {(StartChat, {loading, error, data }) => {
        let name;
        return (
          <div className="users">
            <form onSubmit={e => {
              e.preventDefault();
              StartChat({ variables: { title: name.value, userIds:[name.id]}});
              name.value = "";
              }}>
              <div>
                <input ref={node => (name = node)} id={user.id} value={user.name}/>
                <button type="submit">starts chat</button>
              </div>
            </form>
            </div>  
          )
      }}       
    </Mutation>
  );
}

export default StartChat
