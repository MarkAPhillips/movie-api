/* eslint-disable consistent-return */
import { BASE_URL } from '../constants';
import get from '../services/restService';
import { buildMovies, buildMovie } from './helpers/movieBuilder';

const movieBuilder = async (url, imageSize = 'original') => {
  const data = await get(url);
  const { results } = data;
  return !results
    ? buildMovie(data, imageSize) : buildMovies(results, imageSize);
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

export const similar = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  const url = `${BASE_URL}/movie/${id}/similar?`;
  return movieBuilder(url);
};
