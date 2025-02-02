import { gql } from 'apollo-server-express'

export const typeDefs = gql`
scalar Date
type Query {
    newfeeds: [Post]!
    users: [User]!
    report: [Post]!
    workme(id: ID!): [Work]!
    workorder(id: ID!): [Work]!
}
type Mutation {
    login(username: String!, password: String!): Login!
    uploadfile(file: Upload!, id: ID!): Boolean!
    register(
        username: String!, 
        password: String!, 
        firstname: String!,
        lastname: String!,
        email: String!,
        phone: String!,
        status: String!
    ): Boolean!
    addwork(
        title: String!, 
        detail: String, 
        deadline: String,
        worker: String!,
        commander: String!
    ): Boolean!
    workme(id: ID!, status: String!): Boolean!
    deluser(id: ID!): Boolean!,
    editprofile(
        id: ID!,
        username: String!, 
        firstname: String!,
        lastname: String!,
        email: String!,
        phone: String!,
        password: String
    ): Boolean!
}
type Login{
    token: String
    status: Boolean!
}
type Work {
    _id: String,
    title: String,
    detail: String,
    worker: User,
    commander: User,
    deadline: Date,
    datestatus: Date,
    datesubmit: Date,
    status: String,
    path: String,
}
type User {
    _id: String
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    img: String,
    phone: String,
    status: String
}
type Post {
    _id: String
    title: String
    detail: String,
    worker: User,
    commander: User,
    deadline: Date,
    datestatus: Date,
    datesubmit: Date,
    status: String,
    path: [String],
}
`;
