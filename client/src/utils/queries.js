import { gql } from '@apollo/client'

export const GET_USERS = gql`
query Query {
  users {
    _id
    username
    email
    password
    bookCount
    savedBooks {
      bookId
      authors
      description
      image
      link
      title
    }
  }
}
`