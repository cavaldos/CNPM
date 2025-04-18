/**
 * AI Module GraphQL Client
 *
 * This file defines the GraphQL client for the AI module to communicate with the chatserver.
 */

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { gql } from 'graphql-tag';
import fetch from 'cross-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Get GraphQL server address from environment variables or use default
const GRAPHQL_SERVER_ADDRESS = process.env.GRAPHQL_SERVER_ADDRESS || 'http://localhost:5003/graphql';

// Create Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_SERVER_ADDRESS,
    fetch,
  }),
  cache: new InMemoryCache(),
});

// Define GraphQL queries
export const HELLO_WORLD_QUERY = gql`
  query HelloWorld {
    helloWorld
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      fullName
      age
      role
      createdAt
      updatedAt
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      _id
      username
      email
      fullName
      age
      role
      createdAt
      updatedAt
    }
  }
`;

// Helper function to get hello world message
export const getHelloWorld = async (): Promise<string> => {
  try {
    const { data } = await client.query({
      query: HELLO_WORLD_QUERY,
    });

    return data.helloWorld;
  } catch (error) {
    console.error('Error calling GraphQL service:', error);
    throw new Error('Failed to communicate with GraphQL service');
  }
};

// Define User type
export interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  age?: number;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to get a user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const { data } = await client.query({
      query: GET_USER_QUERY,
      variables: { id },
    });

    return data.user;
  } catch (error) {
    console.error('Error calling GraphQL service:', error);
    throw new Error('Failed to fetch user from GraphQL service');
  }
};

// Helper function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await client.query({
      query: GET_USERS_QUERY,
    });

    return data.users;
  } catch (error) {
    console.error('Error calling GraphQL service:', error);
    throw new Error('Failed to fetch users from GraphQL service');
  }
};

export default client;
