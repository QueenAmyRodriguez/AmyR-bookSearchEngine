const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Query {
        me: User
        user(username: String, _id: ID): User
        books: [Book]
        book:(title: String): Book
    }
    type Mutation {
        login(email: String!, password: String): User
        addUser(username: String!, email: String!, password: String!): User
        saveBook: Book
        removeBook(bookId: String!): User
    }
`

module.exports = typeDefs;