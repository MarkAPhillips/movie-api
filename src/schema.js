const { gql } = require('apollo-server');

const typeDefs = gql`

    type Movie {
        id: ID!
        title: String!
        overview: String!
        voteAverage: Float!
        voteCount: Int!
        releaseDate: String!
        originalLanguage: String!
        popularity: Float!
        imageUrl: String
    }

    type ImageConfiguration {
        baseUrl: String!
        sizes: [String!]!
    }

    type Query {
        trending(width: String = "original"): [Movie!]!
        popular(width: String = "original"): [Movie!]!
        imageConfiguration: ImageConfiguration
    }
`;

export default typeDefs;
