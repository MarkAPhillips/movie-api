/* eslint-disable no-await-in-loop */
import moment from 'moment';
import get from '../restService';
import { buildPosterImage, buildBackDropImage } from './imageBuilder';
import { movieMapper } from './movieBuilder';
import { DATE_FORMAT } from '../../constants';

const currentMovies = (credit) => credit.release_date != null
  && moment().diff(moment(credit.release_date, DATE_FORMAT), 'days') >= 0;

const castMapper = async (cast) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of cast) {
    const poster = await buildPosterImage(movie.poster_path, 'original');
    const backDrop = await buildBackDropImage(movie.backdrop_path);
    const mappedMovieCredit = {
      id: movie.credit_id,
      character: movie.character || null,
      movie: movieMapper(movie, poster, backDrop),
    };
    output.push(mappedMovieCredit);
  }
  return output;
};

const personCreditBuilder = async (url) => {
  const data = await get(url);
  const { cast } = data;
  const movieCredits = cast.filter(currentMovies);
  return castMapper(movieCredits);
};

export default personCreditBuilder;
