import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    user: User
    activeChat: String
  }

  type User {
  id: ID!
  email: String!
  username: String!
  name: String!
  chats: [Chat]
  isAdmin: Boolean
  token: String
}


`

export const resolvers = {
  Query: {
    isLoggedIn() {
      return !!localStorage.getItem('token');
    },
    user: (_, args, { cache }) => {
      console.log(cache, 'AAAAACACHE')
    }
  }
}

