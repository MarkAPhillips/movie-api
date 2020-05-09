const { gql } = require('apollo-server');

const typeDefs = gql`

    type Pagination {
        page: Int!
        pageCount: Int
        totalResults: Int
    }

    type PagedMovie {
        pagination: Pagination
        results: [Movie!]
    }

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
        search(width: String = "original", query: String, page: Int = 1): PagedMovie
    }
`;

export default typeDefs;
