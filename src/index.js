import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { trending, popular } from './resolvers/movies';
import search from './resolvers/search';
import imageConfiguration from './resolvers/configuration';

const resolvers = {
  Query: {
    imageConfiguration,
    trending,
    popular,
    search,
  },
};

const server = new ApolloServer({
  typeDefs: importSchema('src/schema.graphql'),
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
