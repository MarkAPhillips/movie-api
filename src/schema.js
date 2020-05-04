const { gql } = require('apollo-server');

const typeDefs = gql`

    interface Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
        imageUrl: String
    }

    type ImageConfiguration {
        baseUrl: String!
        sizes: [String!]!
    }

    type Query {
        trending(width: String = "original"): [TrendingMovie!]!
        popular(width: String = "original"): [PopularMovie!]!
        imageConfiguration: ImageConfiguration
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
        imageUrl: String
        
    }
`;

export default typeDefs;