import { BASE_URL } from '../constants';
import castBuilder from './helpers/castMemberBuilder';

const getCastMembers = async (id) => {
  const url = `${BASE_URL}/movie/${id}/credits?`;
  return castBuilder(url);
};

export default getCastMembers;
