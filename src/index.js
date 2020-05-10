import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import movies from './resolvers/movies';
import { imageConfiguration } from './resolvers/configuration';

const resolvers = {
  Query: {
    imageConfiguration,
    movies,
  },
};

const server = new ApolloServer({
  typeDefs: importSchema('src/schemas/schema.graphql'),
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
