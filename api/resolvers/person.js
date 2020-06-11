import {
  getPersonById, getPersonMovieCredits,
} from '../../services/personService';

// eslint-disable-next-line import/prefer-default-export
export const person = async (root, { imageSize, id }) => getPersonById(imageSize, id);

export const movieCredits = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getPersonMovieCredits(id);
};
