const { gql } = require('apollo-server');

export const typeDefs = gql`
    type Query {
        trending: [TrendingMovie!]!
        popular: [PopularMovie!]!
    }

    type TrendingMovie {
        id: ID!
        title: String!
        overview: String!
    }

    type PopularMovie {
        id: ID!
        title: String!
        overview: String!
        vote_average: Float!
    }
`;
