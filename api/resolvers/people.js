import { getMovieCredits } from '../../services/movieService';

const credits = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getMovieCredits(id);
};

export default credits;
