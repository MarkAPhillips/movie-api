import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';
import { typeDefs } from './schema';
import { ENV_VARS, BASE_URL } from './constants';

//Example API call
// https://developers.themoviedb.org/3/trending/get-trending
// https://api.themoviedb.org/3/trending/movie/day?api_key=ea47507794900a64810699815ba52020


const resolvers = {
    Query: {
       trending: () => {
           return fetch(`${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`)
           .then(res => res.json())
           .then(({ results }) => {
               return results.map((item) => ({
                id: item.id,
                title: item.title,
                overview: item.overview, 
            }));
        });
       } 
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`GraphQL server started at ${url}`);
});