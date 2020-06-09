import { BASE_URL } from '../constants';
import personBuilder from './builders/personBuilder';
import personCreditBuilder from './builders/personCreditBuilder';

export const getPersonById = async (imageSize, id) => {
  const url = `${BASE_URL}/person/${id}?`;
  return personBuilder(url, imageSize);
};

export const getPersonMovieCredits = async (id) => {
  const url = `${BASE_URL}/person/${id}/credits?`;
  return personCreditBuilder(url);
};
