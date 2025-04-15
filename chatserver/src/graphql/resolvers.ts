import UserRepo from '../api/repository/user.repo';

// Define resolver types
type ResolverContext = {
  req: any;
};

type UserArgs = {
  id: string;
};

// Define GraphQL resolvers
const resolvers = {
  Query: {
    helloWorld: () => {
      return 'Hello World from GraphQL in chatserver!';
    },
    user: async (_: any, { id }: UserArgs, _context: ResolverContext) => {
      try {
        return await UserRepo.getUserById(id);
      } catch (error) {
        console.error('Error in user resolver:', error);
        throw new Error('Failed to fetch user');
      }
    },
    users: async (_: any, _args: {}, _context: ResolverContext) => {
      try {
        return await UserRepo.getAllUsers();
      } catch (error) {
        console.error('Error in users resolver:', error);
        throw new Error('Failed to fetch users');
      }
    },
  },
};

export default resolvers;
