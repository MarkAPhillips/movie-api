import moment from 'moment';
import { buildImage } from './imageBuilder';
import get from '../restService';

const getAge = (birthDate, deathDate) => {
  const dateFormat = 'YYYY-MM-DD';
  if (deathDate != null && birthDate != null) {
    return moment(deathDate, dateFormat).diff(moment(birthDate, dateFormat), 'years');
  }
  return birthDate !== null ? moment().diff(moment(birthDate, dateFormat), 'years') : null;
};

const personMapper = (item, imageUrl) => (
  {
    id: item.id,
    name: item.name,
    imageUrl,
    biography: item.biography,
    birthDate: item.birthday,
    deathDate: item.deathday,
    placeOfBirth: item.place_of_birth,
    age: getAge(item.birthday, item.deathday),
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
