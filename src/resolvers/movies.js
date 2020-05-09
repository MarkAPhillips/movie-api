/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from '../constants';
import { handleResponse, handleError } from '../fetchHandler';
import { buildImage } from '../imageBuilder';
import getPaging from './pagination';

const movieMapper = (item, imageUrl) => (
  {
    id: item.id,
    title: item.title,
    overview: item.overview,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    releaseDate: item.release_date,
    originalLanguage: item.original_language,
    popularity: item.popularity,
    imageUrl,
  }
);

const buildMovies = async (movies, width) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of movies) {
    // eslint-disable-next-line no-await-in-loop
    const imageUrl = await buildImage(movie.poster_path, width);
    output.push(movieMapper(movie, imageUrl));
  }
  return output;
};

const getMovies = async (url, width, hasPaging = false) => {
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    const movies = buildMovies(data.results, width);
    if (hasPaging) {
      return {
        pagination: getPaging(data),
        results: movies,
      };
    }
    return movies;
  } catch (err) {
    handleError(err, url);
  }
};

export const trending = async (parent, args) => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`;
  return getMovies(url, args.width);
};

export const popular = async (parent, args) => {
  const url = `${BASE_URL}/movie/popular?api_key=${ENV_VARS.API_KEY}&language=en-US&page=1`;
  return getMovies(url, args.width);
};

export const search = async (parent, args) => {
  const { width, query, page } = args;
  const url = `${BASE_URL}/search/movie?api_key=${ENV_VARS.API_KEY}&query=${query}&page=${page}`;
  return getMovies(url, width, true);
};
