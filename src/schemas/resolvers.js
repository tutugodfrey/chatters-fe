import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    user: User
    activeChat: String
    logOut: Boolean
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
    isLoggedIn: () => {
      return !!localStorage.getItem('token');
    },
    activeChat(root, args, context, info) {
      const activeChat = context.cache.readQuery({ query: ACTIVE_CHAT })
      return activeChat
    }
  },
  Mutation: {
    activeChat: (root, variables, {cache, getCacheKey }, info) => {
      const { id } = variables
      const chatId = getCacheKey({ __typename: 'Chat', id })
      const fragment = gql`
        fragment Chat on Chat {
          id,
          title,
          messages {
            id,
            body,
            createdAt
          }
        }
      `
      const chat = cache.readFragment({ fragment, id: chatId })
      return cache.writeData({ data: { activeChat: chat }})
    },
  }
}
