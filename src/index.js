import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { trending, popular, search } from './resolvers/movies';
import { imageConfiguration } from './resolvers/configuration';

const resolvers = {
  Query: {
    trending,
    popular,
    imageConfiguration,
    search,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
