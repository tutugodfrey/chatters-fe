import React from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation, ApolloConsumer } from 'react-apollo';
import  { InMemoryCache } from 'apollo-boost'
import { Redirect } from 'react-router-dom';
import StartChat from './StartChat.jsx';


const people = gql`
  query users {
    users {
      id,
      name,
      email,
      username
    }
  }
`
const START_CHAT = gql`
   mutation StartChat($title: String, $userIds: [ID!]!) {
     startChat(title: $title, userIds: $userIds) {
       id,
       title,
       users {
         id,
         name,
         username,
         email
       }
     }
   }
 `;
const People = () => {

  return (
    <Query query={people}>{
      (props) => {
        const {loading, data} = props
        const users = data.users
        let usersDiv;
        if (loading)return <div>Loading</div>
        if (users) {
          usersDiv =  users.map(user => {
            return <StartChat key={user.id} user={user} startChat={START_CHAT} />
          })
        }
        return (
          <div>
            {usersDiv}
          </div>
        )
      }}
    </Query>
  )
}

export default People
