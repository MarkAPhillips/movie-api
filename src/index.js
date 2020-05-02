import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { trending, popular } from './resolvers';

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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`GraphQL server started at ${url}`);
});
