import { gql } from 'apollo-server-express';

// Define GraphQL schema
const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`;

export default typeDefs;
