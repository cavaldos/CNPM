// Define GraphQL resolvers
const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello World from GraphQL in chatserver!';
    },
  },
};

export default resolvers;
