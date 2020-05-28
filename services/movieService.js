import { BASE_URL } from '../constants';
import get from './restService';
import { buildMovies, buildMovie } from './helpers/movieBuilder';

const movieBuilder = async (url, imageSize = 'original') => {
  const data = await get(url);
  const { results } = data;
  return !results
    ? buildMovie(data, imageSize) : buildMovies(results, imageSize);
};

export const getTrending = async (imageSize, period = 'day') => {
  const url = `${BASE_URL}/trending/movie/${period}?`;
  return movieBuilder(url, imageSize);
};

export const getPopular = async (imageSize) => {
  const url = `${BASE_URL}/movie/popular?`;
  return movieBuilder(url, imageSize);
};

export const getMovieById = async (imageSize, id) => {
  const url = `${BASE_URL}/movie/${id}?`;
  return movieBuilder(url, imageSize);
};

export const getSimilar = async (id) => {
  const url = `${BASE_URL}/movie/${id}/similar?`;
  return movieBuilder(url);
};
