import { BASE_URL } from '../constants';
import castBuilder from './helpers/castMemberBuilder';
import movieBuilder from './helpers/movieBuilder';

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

export const getRecommended = async (id) => {
  const url = `${BASE_URL}/movie/${id}/recommendations?`;
  return movieBuilder(url);
};

export const getCastMembers = async (id) => {
  const url = `${BASE_URL}/movie/${id}/credits?`;
  return castBuilder(url);
};
