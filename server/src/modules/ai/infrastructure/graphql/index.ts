/**
 * AI Module GraphQL Infrastructure Index
 *
 * This file exports the GraphQL client for the AI module.
 */

import client, {
  getHelloWorld, HELLO_WORLD_QUERY,
  getUserById, GET_USER_QUERY,
  getAllUsers, GET_USERS_QUERY,
  User
} from './client';

export {
  client,
  getHelloWorld,
  HELLO_WORLD_QUERY,
  getUserById,
  GET_USER_QUERY,
  getAllUsers,
  GET_USERS_QUERY,
  User
};
