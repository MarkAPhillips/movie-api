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
    trending (imageSize: "w154", period: week) {
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
**period** is optional and defaults to **day** 
Options are day|week

2. [Get Popular Movies](https://developers.themoviedb.org/3/movies/get-popular-movies)

```
 query {
    popular(imageSize: "w154") {
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
      imageSizes,
    }
  }
```

4. [Search Movies](https://developers.themoviedb.org/3/search/search-movies)

```
query {
  search(filter:{ searchText:"fish"}, page:2) {
    edges {
      node {
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
    totalCount
   	pageNo
    noOfPages
  }
}
```

`imageSize` parameter can be obtained by querying the *imageConfiguration* end point and selecting an entry from the `imageSizes` property.

If no `imageSizes` argument is passed this defaults to *original* 

## Setting up Circle CI

Add the following Environment Variables to **movie api** project settings:

```
API_KEY - MovieDb API Key
HEROKU_API_KEY - Heroku API Key
HEROKU_APP_NAME - eu-movie-api
```

Add additional SSH Key for github 

```
Hostname: github.com
Private key: see details below on how to create this
```

## SSH Keys

As part of deployment via Circle CI need to create a ssh key to push changes to github

`ssh-keygen -m PEM -t rsa -C "work-mpconsults@outlook.com"`

Press enter for each option (no passphrase required as this will encrypt the key)

A key is generated in the following file `id_rsa.pub` (public) and `id_rsa` (private)

Run `ls -al ~/.ssh` to see all keys created

Copy key to clipboard `pbcopy < ~/.ssh/id_rsa.pub`

Public key needs to be added to **gitHub**

Copy key to clipboard `pbcopy < ~/.ssh/id_rsa`

Private key needs to be added to **Circle Ci**


