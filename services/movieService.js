import { BASE_URL } from '../constants';
import getFeaturedMovieId from '../db/queries/movie';
import creditBuilder from './builders/creditBuilder';
import movieBuilder from './builders/movieBuilder';
import certificationBuilder from './builders/certificationBuilder';

export const getMovieById = async (imageSize, id) => {
  const url = `${BASE_URL}/movie/${id}?`;
  return movieBuilder(url, imageSize);
};

export const getTrending = async (imageSize, period = 'day') => {
  const url = `${BASE_URL}/trending/movie/${period}?`;
  return movieBuilder(url, imageSize);
};

export const getPopular = async (imageSize) => {
  const url = `${BASE_URL}/movie/popular?`;
  return movieBuilder(url, imageSize);
};

export const getFeatured = async (imageSize) => {
  const id = await getFeaturedMovieId();
  return getMovieById(imageSize, id);
};

export const getSimilar = async (id) => {
  const url = `${BASE_URL}/movie/${id}/similar?`;
  return movieBuilder(url);
};

export const getRecommended = async (id) => {
  const url = `${BASE_URL}/movie/${id}/recommendations?`;
  return movieBuilder(url);
};

export const getMovieCredits = async (id) => {
  const url = `${BASE_URL}/movie/${id}/credits?`;
  return creditBuilder(url);
};

export const getCertifications = async (id) => {
  const url = `${BASE_URL}/movie/${id}/release_dates?`;
  return certificationBuilder(url);
};
