/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from '../constants';
import { handleResponse, handleError } from '../fetchHandler';
import { buildImage } from '../imageBuilder';

export const trending = async (parent, args) => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { results } = await handleResponse(response);
    const output = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      // eslint-disable-next-line no-await-in-loop
      const imageUrl = await buildImage(result.poster_path, args.width);
      output.push({
        id: result.id,
        title: result.title,
        overview: result.overview,
        voteAverage: result.vote_average,
        imageUrl,
      });
    }
    return output;
  } catch (err) {
    handleError(err, url);
  }
};

export const popular = async (parent, args) => {
  const url = `${BASE_URL}/movie/popular?api_key=${ENV_VARS.API_KEY}&language=en-US&page=1`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { results } = await handleResponse(response);
    const output = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      // eslint-disable-next-line no-await-in-loop
      const imageUrl = await buildImage(result.poster_path, args.width);
      output.push({
        id: result.id,
        title: result.title,
        overview: result.overview,
        imageUrl,
        voteAverage: result.vote_average,
      });
    }
    return output;
  } catch (err) {
    handleError(err, url);
  }
};
