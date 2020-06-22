import personBuilder from './personBuilder';
import get from '../restService';

const url = 'https://api.themoviedb.org/3/person/59675';

const mockData = {
  birthday: '1973-06-12',
  known_for_department: 'Acting',
  deathday: null,
  id: 59675,
  name: 'Mel Rodriguez',
  also_known_as: [],
  gender: 2,
  biography: 'Robert Michael Morris is an American actor.',
  popularity: 3.168,
  place_of_birth: 'Miami, Florida, USA',
  profile_path: '/wwvthcEDo6WHOHumcoh1tT1IaoB.jpg',
  adult: false,
  imdb_id: 'nm0735440',
  homepage: null,
};

// mocks
jest.mock('../restService');
get.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./imageBuilder', () => ({
  buildPosterImage: jest.fn(() => Promise.resolve('https://image.tmdb.org/t/p/w154/wwvthcEDo6WHOHumcoh1tT1IaoB.jpg')),
}));

/** Mock current datetime */
Date.now = jest.fn(() => new Date('2018-05-13T12:33:37.000Z'));

describe('personBuilder tests', () => {
  it('should return a person', async () => {
    const expected = {
      id: 59675,
      name: 'Mel Rodriguez',
      imageUrl: 'https://image.tmdb.org/t/p/w154/wwvthcEDo6WHOHumcoh1tT1IaoB.jpg',
      biography: 'Robert Michael Morris is an American actor.',
      birthDate: '1973-06-12',
      deathDate: null,
      age: 44,
      placeOfBirth: 'Miami, Florida, USA',
    };
    const person = await personBuilder(url, 'w154');
    expect(get).toHaveBeenCalledWith(url);
    expect(person).toEqual(expected);
  });
});
