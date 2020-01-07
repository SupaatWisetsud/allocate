import { gql } from 'apollo-server-express'

const typeDefs = gql`

type Query {
    newfeeds: [Post]
    users: [User]
    report: [Report]
    workme(id: ID!): [Work]
    workorder(id: ID!): [Work]
}

type Mutation {
    login(username: String!, password: String!): Login!
    uploadfile(file: Upload!): Boolean
}

type Login{
    token: String
    status: Boolean!
}

type Work {
    w_id: String,
    w_title: String,
    w_detail: String,
    w_worker: String,
    w_commander: String,
    w_deadline: String,
    w_datestatus: String,
    w_datesubmit: String,
    w_status: String,
    w_path: String,
    m_id: String,
    m_username: String,
    m_firstname: String,
    m_lastname: String,
    m_email: String,
    m_img: String,
    m_numberphone: String,
    m_status: String
}

type User {
    m_id: String
    m_username: String,
    m_firstname: String,
    m_lastname: String,
    m_email: String,
    m_img: String,
    m_numberphone: String,
    m_status: String
}
type Post {
    w_id: String
    w_title: String
    w_detail: String,
    w_worker: String,
    w_commander: String,
    w_deadline: String,
    w_datestatus: String,
    w_datesubmit: String,
    w_status: String,
    w_path: String,
    m_id: String,
    m_username: String,
    m_firstname: String,
    m_lastname: String,
    m_email: String,
    m_img: String,
    m_numberphone: String,
    m_status: String
}

type Report {
    w_id: String,
    w_title: String,
    w_detail: String,
    w_worker: String,
    w_commander: String,
    w_deadline: String,
    w_datestatus: String,
    w_datesubmit: String,
    w_status: String,
    w_path: String,
    m_id: String,
    m_username: String,
    m_password: String,
    m_firstname: String,
    m_lastname: String,
    m_email: String,
    m_img: String,
    m_numberphone: String,
    m_status: String
}

`;

export default typeDefs