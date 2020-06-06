import { getCastMembers } from '../../services/movieService';

const cast = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  return getCastMembers(id);
};

export default cast;
