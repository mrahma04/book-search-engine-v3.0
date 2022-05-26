const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Query {
        helloWorld: String
        users: [User]
        user(_id: ID!): User
    }

    type Auth {
        token: ID!
        user: User
    }

    # create common input fields for mutations
    input UserInput {
        username: String
        email: String
        password: String
    }


    type Mutation {
        addUser(input: UserInput!): Auth
    }
`

module.exports = typeDefs