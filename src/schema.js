const { gql } = require('apollo-server');

export const typeDefs = gql`

    interface Movie {
        id: ID!
        title: String!
        overview: String!
    }

    type Query {
        trending: [TrendingMovie!]!
        popular: [PopularMovie!]!
        configuration: Configuration
    }

    type TrendingMovie implements Movie {
        id: ID!
        title: String!
        overview: String!
    }

    type PopularMovie implements Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
    }

    type Configuration {
        imageBaseUrl: String!
        imagePosterSizes: [String!]!
    }
`;
