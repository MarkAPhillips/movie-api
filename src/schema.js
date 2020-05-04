const { gql } = require('apollo-server');

const typeDefs = gql`

    interface Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
    }

    type Query {
        trending: [TrendingMovie!]!
        popular: [PopularMovie!]!
    }

    type TrendingMovie implements Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
        imageUrl: String
    }

    type PopularMovie implements Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
    }
`;

export default typeDefs;