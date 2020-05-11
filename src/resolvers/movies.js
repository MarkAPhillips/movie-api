/* eslint-disable consistent-return */
import { BASE_URL } from '../constants';
import { buildImage } from '../imageBuilder';
import get from '../services/restService';

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

export const buildMovies = async (movies, imageSize) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of movies) {
    // eslint-disable-next-line no-await-in-loop
    const imageUrl = await buildImage(movie.poster_path, imageSize);
    output.push(movieMapper(movie, imageUrl));
  }
  return output;
};

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
