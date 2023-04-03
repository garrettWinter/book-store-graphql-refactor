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
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: String
    user: User
}

type Query {
    me: User
}

input saveBookVariables {
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Mutation {
    login(email: String! password: String!): Auth
    adduser(username: String! email: String! password: String!): Auth
    saveBook(input: saveBookVariables): Book
    removeBook(bookId: String):Book
}
`;

module.exports = typeDefs;

