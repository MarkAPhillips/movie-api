import { ApolloServer } from 'apollo-server';
import { importSchema } from 'graphql-import';
import { GraphQLDate } from 'graphql-iso-date';
import {
  trending, popular, movie, featured, similar, recommended, certifications, credits,
} from './resolvers/movies';
import { person, movieCredits } from './resolvers/person';
import search from './resolvers/search';
import imageConfiguration from './resolvers/configuration';

const resolvers = {
  Date: GraphQLDate,
  Query: {
    imageConfiguration,
    trending,
    popular,
    featured,
    movie,
    search,
    person,
  },
  Movie: {
    similar,
    recommended,
    credits,
    certifications,
  },
  Person: {
    credits: movieCredits,
  },
  PersonIdentifier: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(root) {
      return root.biography ? 'Person' : 'PersonMovieCredits';
    },
  },
};

const server = new ApolloServer({
  typeDefs: importSchema('api/schema.graphql'),
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
