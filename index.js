import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { trending, popular } from './resolvers';

const resolvers = {
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