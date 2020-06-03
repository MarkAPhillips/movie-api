/* eslint-disable no-await-in-loop */
import get from '../restService';
import { buildImage } from './imageBuilder';

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
      id: member.credit_id,
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

export default castBuilder;
