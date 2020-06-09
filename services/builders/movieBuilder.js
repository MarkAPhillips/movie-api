import { buildImage } from './imageBuilder';
import get from '../restService';

const movieMapper = (item, imageUrl) => (
  {
    id: item.id,
    title: item.title,
    overview: item.overview,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    releaseDate: item.release_date === '' ? null : item.release_date,
    originalLanguage: item.original_language,
    popularity: item.popularity,
    imageUrl,
    runTime: item.runtime || null,
    homePage: item.homePage || null,
    genres: item.genres || [],
  }
);

export const buildMovie = async (movie, imageSize) => {
  const imageUrl = await buildImage(movie.poster_path, imageSize);
  return movieMapper(movie, imageUrl);
};

export const buildMovies = async (movies, imageSize) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of movies) {
    // eslint-disable-next-line no-await-in-loop
    const mappedMovie = await buildMovie(movie, imageSize);
    output.push(mappedMovie);
  }
  return output;
};

const movieBuilder = async (url, imageSize = 'original') => {
  const data = await get(url);
  const { results } = data;
  return !results
    ? buildMovie(data, imageSize) : buildMovies(results, imageSize);
};

export default movieBuilder;