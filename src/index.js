import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { trending, popular, configuration } from './resolvers';

const resolvers = {
  Movie: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveType(movie) {
      return (movie.voteAverage) ? 'PopularMovie' : 'TrendingMovie';
    },
  },
  Query: {
    trending,
    popular,
    configuration,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
