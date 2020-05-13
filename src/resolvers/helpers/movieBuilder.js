import { buildImage } from './imageBuilder';

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

// todo: have initially built movie detail based on same schema/model as 'trending/popular',
// need to look at maybe extending movie to encompass additional properties
export const buildMovie = async (movie, imageSize) => {
  // eslint-disable-next-line no-await-in-loop
  const imageUrl = await buildImage(movie.poster_path, imageSize);
  return { ...movieMapper(movie, imageUrl) };
};
