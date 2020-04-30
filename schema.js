const { gql } = require('apollo-server');

export const typeDefs = gql`
    type Query {
        trending: [Movie!]!
    }

    type Movie {
        id: ID!
        title: String!
        overview: String!
    }
`;
