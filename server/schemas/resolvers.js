const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        helloWorld: () => {
            return 'Hello world!'
        },
        users: async () => {
            return User.find()
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id })
            // .populate('posts')
            // .populate('pets')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args.input)
            const token = signToken(user)

            return { user, token }
        }
    }
}

module.exports = resolvers