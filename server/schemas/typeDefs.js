const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Book {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    # create common input fields for mutations
    input UserInput {
        username: String
        email: String
        password: String
    }

    input BookInput {
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Query {
        helloWorld: String
        users: [User]
        user(_id: ID!): User
        me: User
    }

    type Mutation {
        addUser(input: UserInput!): Auth
        login(email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
    }
`

module.exports = typeDefs