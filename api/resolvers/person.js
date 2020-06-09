import {
  getPersonById,
} from '../../services/personService';

// eslint-disable-next-line import/prefer-default-export
export const person = async (root, { imageSize, id }) => getPersonById(imageSize, id);
