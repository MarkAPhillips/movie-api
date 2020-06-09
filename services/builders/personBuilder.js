import { buildImage } from './imageBuilder';
import get from '../restService';

const personMapper = (item, imageUrl) => (
  {
    id: item.id,
    name: item.name,
    imageUrl,
    biography: item.biography,
    birthDate: item.birthday,
    deathDate: item.deathday,
    placeOfBirth: item.place_of_birth,
  }
);

export const buildPerson = async (person, imageSize) => {
  const imageUrl = await buildImage(person.profile_path, imageSize);
  return personMapper(person, imageUrl);
};

const personBuilder = async (url, imageSize = 'original') => {
  const person = await get(url);
  return buildPerson(person, imageSize);
};

export default personBuilder;
