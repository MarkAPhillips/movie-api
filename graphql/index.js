import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { GraphQLDate } from 'graphql-iso-date';
import {
  trending, popular, movie, similar,
} from './resolvers/movies';
import cast from './resolvers/people';
import search from './resolvers/search';
import imageConfiguration from './resolvers/configuration';

const resolvers = {
  Date: GraphQLDate,
  Query: {
    imageConfiguration,
    trending,
    popular,
    movie,
    search,
  },
  Movie: {
    similar,
    cast,
  },
};

const server = new ApolloServer({
  typeDefs: importSchema('graphql/schema.graphql'),
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
