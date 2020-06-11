/* eslint-disable no-await-in-loop */
import get from '../restService';
import { buildImage } from './imageBuilder';
import { movieMapper } from './movieBuilder';

const castMapper = async (cast) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of cast) {
    const imageUrl = await buildImage(movie.poster_path, 'original');
    const mappedMovieCredit = {
      id: movie.credit_id,
      character: movie.character,
      movie: movieMapper(movie, imageUrl),
    };
    output.push(mappedMovieCredit);
  }
  return output;
};

const personCreditBuilder = async (url) => {
  const data = await get(url);
  const { cast } = data;
  return castMapper(cast);
};

export default personCreditBuilder;
