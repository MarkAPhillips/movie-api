import {
  getTrending, getPopular, getMovieById, getSimilar,
} from '../../services/movieService';

export const trending = async (root, { imageSize, period }) => getTrending(imageSize, period);

export const popular = async (root, { imageSize }) => getPopular(imageSize);

export const movie = async (root, { imageSize, id }) => getMovieById(imageSize, id);

export const similar = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getSimilar(id);
};
