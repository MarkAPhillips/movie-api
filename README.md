# Movie API

## Introduction

GraphQL wrapper for the The Movie Database API. 

CI/CD using Circle CI

Deployed to Heroku at [https://eu-movie-api.herokuapp.com/](https://eu-movie-api.herokuapp.com/)

## Installation

In project root run the following:

`echo API_KEY={API_KEY} > .env`

Replacing `{API_KEY}` with a valid api key created at the [Movie Database API](https://developers.themoviedb.org/3/getting-started/introduction)

`echo DB_PWD={DB_PWD} >> .env`

Replacing `{DB_PWD}` with the password created for user dbUser on [MongoDB Atlas Account](https://cloud.mongodb.com/)

Run `npm i`

## Run & Build Locally

Run `npm start`

Browse to [GraphQL Playground](http://localhost:4000/) running locally and test by running the following queries exposed below.

Any changes to the code using this method force a rebuild 

## Run & Build with Docker

Ensure [Docker](https://docs.docker.com/get-docker/) is installed locally.

For MacOS review the following [documentation](https://runnable.com/docker/install-docker-on-macos)

Run `npm run start:docker`

Browse to [GraphQL Playground](http://localhost:4000/) running locally

## GraphQL Queries

1. [Get Trending Movies](https://developers.themoviedb.org/3/trending/get-trending)

```
 query {
    trending (imageSize: "w154", period: week) {
      id
      title
      overview
      voteAverage
      popularity
      voteCount
      releaseDate
      originalLanguage
      images {
        poster
        backDrop
      }
    }
  }
```
**period** is optional and defaults to **day** 
Options are day|week

2. [Get Popular Movies](https://developers.themoviedb.org/3/movies/get-popular-movies)

```
 query {
    popular(imageSize: "w154") {
      id
      title
      overview
      voteAverage
      popularity
      voteCount
      releaseDate
      originalLanguage
      images {
        poster
        backDrop
      }
    }
  }
```

3. [Get Image Configuration](https://developers.themoviedb.org/3/configuration/get-api-configuration)

```
query {
    imageConfiguration {
      baseUrl
      imageSizes
    }
  }
```

4. [Search Movies](https://developers.themoviedb.org/3/search/search-movies)

```
query {
  search(filter:{ searchText:"sharknado"}, page:1) {
    totalCount
    page
    noOfPages
    edges {
      node {
        id
        title
        overview
        voteAverage
        popularity
        voteCount
        releaseDate
        originalLanguage
        images {
          poster
          backDrop
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
```

5. [Get a Movie By Id](https://developers.themoviedb.org/3/movies/get-movie-details)

```
 query {
    movie(id: 545609, showCast: $showCast, creditsLimit:$creditsLimit) {
      id
      title
      overview
      voteAverage
      popularity
      voteCount
      releaseDate
      originalLanguage
      runTime
      images {
        poster
        backDrop
      }
      genres {
        id
        name
      }
      homePage,
      similar {
        id
        title
      }
      recommended {
        id
        title
      }
      certifications {
        countryCode
        certification
      }
      credits {
        crew {
          id
          name
          job
        }
        cast @include(if: $showCast) {
          id
          character
          person {
            id
            name
            imageUrl
          }
        }
    }
  }
```

*creditslimit* restricts the limit for cast and crew members returned. Currently defaults to 100.

*showCast* defines if cast should be returned in the query.


6. [Get a Person By Id](https://developers.themoviedb.org/3/people/get-person-details)

```
query{
  person(imageSize: "w154", id: 10990) {
    id
    name
    biography
    birthDate
    deathDate
    age
    imageUrl
    placeOfBirth
    credits {
      id
      character
      movie {
        title
        overview
        voteAverage
        popularity
        voteCount
        releaseDate
        originalLanguage
        images {
          poster
          backDrop
        }
      }
    }
  }
}
```

Recommended and similar movies can contain an array of Movie objects.

The above search pagination is a hybrid based on standard [relay cursor pagination](https://relay.dev/graphql/connections.htm) and limitations in the current MovieDB REST API. 

The MovieDB REST API has a fixed page size of **20** records and requires a **page** number to be passed as part of the query. This therefore restricts the implementation of a pure cursor based pagination in relation to performance. 

### Notes

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

## Scheduler

A scheduler is run on a daily basis to store the current featured movie. 
The following task is run at midnight using the Heroku Scheduler add-on.

`npm run tasks`

