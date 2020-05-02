/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from './constants';
import { handleResponse, handleError } from './fetchHandler';
import buildImage from './imageBuilder';

export const trending = async () => {
  const url = `${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { results } = await handleResponse(response);
    const output = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const result of results) {
      // eslint-disable-next-line no-await-in-loop
      const imageUrl = await buildImage(result.poster_path);
      output.push({
        id: result.id,
        title: result.title,
        overview: result.overview,
        imageUrl,
      });
    }
    return output;
  } catch (err) {
    handleError(err, url);
  }
};

export const popular = async () => {
  const url = `${BASE_URL}/movie/popular?api_key=${ENV_VARS.API_KEY}&language=en-US&page=1`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { results } = await handleResponse(response);
    return results.map((item) => ({
      id: item.id,
      title: item.title,
      overview: item.overview,
      voteAverage: item.vote_average,
    }));
  } catch (err) {
    handleError(err, url);
  }
};
