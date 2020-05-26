/* eslint-disable no-await-in-loop */
import { BASE_URL } from '../../constants';
import get from '../services/restService';
import { buildImage } from '../services/helpers/imageBuilder';

const personMapper = async (item, imageUrl) => ({
  id: item.id,
  name: item.name,
  imageUrl,
});

const castMapper = async (cast) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const member of cast) {
    const imageUrl = await buildImage(member.profile_path, 'original');
    const mappedMember = {
      id: member.cast_id,
      character: member.character,
      person: await personMapper(member, imageUrl),
    };
    output.push(mappedMember);
  }
  return output;
};

const castBuilder = async (url) => {
  const data = await get(url);
  const { cast } = data;
  return castMapper(cast);
};

const cast = async (root) => {
  if (!root.id) return null;
  const { id } = root;
  const url = `${BASE_URL}/movie/${id}/credits?`;
  return castBuilder(url);
};

export default cast;
