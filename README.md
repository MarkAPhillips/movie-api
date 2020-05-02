# Movie API

## Installation

In project root run the following:

`echo API_KEY={API_KEY} > .env`

Replacing **{API_KEY}** with a valid api key created at the [Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)

Run `npm i`

## Run & build locally

Run `npm start`

Browse to [GraphQL Playground](http://localhost:4000/) running locally and test by running the following queries exposed below.

Any changes to the code using this method force a rebuild 

## Run & build with Docker

Ensure [Docker](https://docs.docker.com/get-docker/) is installed locally.

For macos review the following [documentation](https://runnable.com/docker/install-docker-on-macos)

Run `npm run docker:build`

Creates a Docker image and tags it with `latest`

Run `npm run docker:run` 

Runs the Docker VM and loads the application.

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



