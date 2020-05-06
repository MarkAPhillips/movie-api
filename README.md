# Movie API

## Introduction

GraphQL wrapper for the The Movie Database API. 

CI/CD using Circle CI

Deployed to Heroku at [https://eu-movie-api.herokuapp.com/](https://eu-movie-api.herokuapp.com/)

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

For MacOS review the following [documentation](https://runnable.com/docker/install-docker-on-macos)

Run `npm run start:docker`

Browse to [GraphQL Playground](http://localhost:4000/) running locally

## GraphQL Queries

1. [Get Trending Movies](https://developers.themoviedb.org/3/trending/get-trending)

```
 query {
    trending (width: "w154") {
      id,
      title,
      overview,
      imageUrl,
      voteAverage,
      popularity,
      voteCount,
      releaseDate,
      originalLanguage,
    }
  }
```

2. [Get Popular Movies](https://developers.themoviedb.org/3/movies/get-popular-movies)

```
 query {
    popular(width: "w154") {
      id,
      title,
      overview,
      imageUrl,
      voteAverage,
      popularity,
      voteCount,
      releaseDate,
      originalLanguage,
    }
  }
```

3. [Get Image Configuration](https://developers.themoviedb.org/3/configuration/get-api-configuration)

```
query {
    imageConfiguration {
      baseUrl,
      sizes,
    }
  }
```
`size` parameter can be obtained by querying the *imageConfiguration* end point and selecting an entry from the `sizes` property.

If no `size` argument is passed this defaults to *original* 

## Notes

As part of deployment via Cricle CI need to create a ssh key to push changes to github

`ssh-keygen -m PEM -t rsa -C "work-mpconsults@outlook.com"`

Press enter for each option

A key is generated in the following file `id_rsa.pub`

Run `ls -al ~/.ssh` to see all keys created

Copy key to clipboard `pbcopy < ~/.ssh/id_rsa.pub`


