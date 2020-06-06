import {
  getTrending, getPopular, getMovieById, getSimilar, getRecommended, getCertifications,
} from '../../services/movieService';

export const trending = async (root, { imageSize, period }) => getTrending(imageSize, period);

export const popular = async (root, { imageSize }) => getPopular(imageSize);

export const movie = async (root, { imageSize, id }) => getMovieById(imageSize, id);

export const similar = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getSimilar(id);
};

export const recommended = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getRecommended(id);
};

export const certifications = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getCertifications(id);
};
