/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from '../constants';
import { handleResponse, handleError } from '../fetchHandler';
import { buildImage } from '../imageBuilder';

const buildMovie = (item, imageUrl) => (
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

const getMovie = async (url, width) => {
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { results } = await handleResponse(response);
    const output = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      // eslint-disable-next-line no-await-in-loop
      const imageUrl = await buildImage(result.poster_path, width);
      output.push(buildMovie(result, imageUrl));
    }
    return output;
  } catch (err) {
    handleError(err, url);
  }
};

export const trending = async (parent, args) => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`;
  return getMovie(url, args.width);
};

export const popular = async (parent, args) => {
  const url = `${BASE_URL}/movie/popular?api_key=${ENV_VARS.API_KEY}&language=en-US&page=1`;
  return getMovie(url, args.width);
};
