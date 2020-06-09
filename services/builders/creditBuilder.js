/* eslint-disable no-await-in-loop */
import get from '../restService';
import { buildImage } from './imageBuilder';

const personMapper = (item, imageUrl) => ({
  id: item.id,
  name: item.name,
  imageUrl,
});

const crewMapper = (crew) => crew.map((item) => ({
  id: item.credit_id,
  job: item.job,
  name: item.name,
}));

const castMapper = async (cast) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const member of cast) {
    const imageUrl = await buildImage(member.profile_path, 'original');
    const mappedMember = {
      id: member.credit_id,
      character: member.character,
      person: personMapper(member, imageUrl),
    };
    output.push(mappedMember);
  }
  return output;
};

const creditBuilder = async (url) => {
  const data = await get(url);
  const { cast, crew } = data;
  const mappedCast = castMapper(cast);
  const mappedCrew = crew ? crewMapper(crew) : [];
  return { crew: mappedCrew, cast: mappedCast };
};

export default creditBuilder;
