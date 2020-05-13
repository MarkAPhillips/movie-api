/* eslint-disable consistent-return */
import { BASE_URL } from '../constants';
import get from '../services/restService';
import { buildMovies, buildMovie } from './helpers/movieBuilder';

// todo: possibly split this into 'moviesBuilder' and 'movieBuilder'
// instead of relying on existence of 'results' (to discuss)
const movieBuilder = async (url, imageSize) => {
  const data = await get(url);
  const { results } = data;
  if (results) {
    return buildMovies(results, imageSize);
  }
  return buildMovie(data, imageSize);
};


export const trending = async (root, { imageSize, period }) => {
  const url = `${BASE_URL}/trending/movie/${period}?`;
  return movieBuilder(url, imageSize);
};

export const popular = async (root, { imageSize }) => {
  const url = `${BASE_URL}/movie/popular?`;
  return movieBuilder(url, imageSize);
};

export const movie = async (root, { imageSize, id }) => {
  const url = `${BASE_URL}/movie/${id}?`;
  return movieBuilder(url, imageSize);
};
