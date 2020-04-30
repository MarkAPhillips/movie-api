# Movie API

## Installation

In project root run the following:

`echo API_KEY='"{API_KEY}"' > .env`

Replacing **{API_KEY}** with a valid key for [Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)

Run `npm i`

## Run & build

Run `npm start`

## GraphQL Queries

1. [Get Trending Movies](https://developers.themoviedb.org/3/trending/get-trending)

```
 query {
    trending {
      id,
      title,
      overview,
    }
  }
```



