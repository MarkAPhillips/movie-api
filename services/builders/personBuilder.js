import moment from 'moment';
import { buildPosterImage } from './imageBuilder';
import get from '../restService';
import { DATE_FORMAT } from '../../constants';

const getAge = (birthDate, deathDate) => {
  if (deathDate != null && birthDate != null) {
    return moment(deathDate, DATE_FORMAT).diff(moment(birthDate, DATE_FORMAT), 'years');
  }
  return birthDate !== null ? moment().diff(moment(birthDate, DATE_FORMAT), 'years') : null;
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
  const imageUrl = await buildPosterImage(person.profile_path, imageSize);
  return personMapper(person, imageUrl);
};

const personBuilder = async (url, imageSize = 'original') => {
  const person = await get(url);
  return buildPerson(person, imageSize);
};

export default personBuilder;
