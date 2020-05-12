/* eslint-disable consistent-return */
import { BASE_URL } from '../constants';
import get from '../services/restService';
import buildMovies from './helpers/movieBuilder';

const movieBuilder = async (url, imageSize) => {
  const data = await get(url);
  const { results } = data;
  return buildMovies(results, imageSize);
};


export const trending = async (root, { imageSize, period }) => {
  const url = `${BASE_URL}/trending/movie/${period}?`;
  return movieBuilder(url, imageSize);
};

export const popular = async (root, { imageSize }) => {
  const url = `${BASE_URL}/movie/popular?`;
  return movieBuilder(url, imageSize);
};
