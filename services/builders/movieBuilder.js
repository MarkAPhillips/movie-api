import { buildPosterImage, buildBackDropImage } from './imageBuilder';
import get from '../restService';

export const movieMapper = (item, poster, backDrop) => (
  {
    id: item.id,
    title: item.title,
    overview: item.overview,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    releaseDate: item.release_date === '' ? null : item.release_date,
    originalLanguage: item.original_language,
    popularity: item.popularity,
    runTime: item.runtime || null,
    homePage: item.homePage || null,
    genres: item.genres || [],
    images: {
      poster,
      backDrop,
    },
  }
);

export const buildMovie = async (movie, imageSize) => {
  const poster = await buildPosterImage(movie.poster_path, imageSize);
  const backDrop = await buildBackDropImage(movie.backdrop_path);
  return movieMapper(movie, poster, backDrop);
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
