import { gql } from 'apollo-server-express';

// Define GraphQL schema
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    fullName: String!
    age: Int
    role: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    helloWorld: String
    user(id: ID!): User
    users: [User]
  }
`;

export default typeDefs;
