import {
  getTrending,
  getPopular,
  getMovieById,
  getSimilar,
  getRecommended,
  getCertifications,
  getMovieCredits,
  getFeatured,
} from '../../services/movieService';

export const trending = async (root, { imageSize, period }) => getTrending(imageSize, period);

export const popular = async (root, { imageSize }) => getPopular(imageSize);

export const featured = async (root, { imageSize }) => getFeatured(imageSize);

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

export const credits = async (root, args, context, info) => {
  if (!root.id) return null;
  const { id } = root;
  const { creditsLimit } = info.variableValues;
  return getMovieCredits(id, creditsLimit);
};
