import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import typeDefs from './schema';
import resolvers from './resolvers';

// Function to set up Apollo Server with Express
export const setupApolloServer = async (app: Express, path: string = '/graphql'): Promise<void> => {
  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can add authentication context here if needed
      return { req };
    },
  });

  // Start Apollo Server
  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({ app, path });

  console.log(`\n 🚀 ➜ GraphQL server running at http://localhost:${process.env.PORT_SERVER || 5003}${server.graphqlPath}`);
};

export { typeDefs, resolvers };
