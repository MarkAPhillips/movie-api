import cast from './people';
import { getCastMembers } from '../../services/movieService';

const mockData = [
  {
    id: '52fe446ec3a368484e022aad',
    character: 'Eddie Marino',
    person: {
      id: 5694,
      name: 'Robert Forster',
      imageUrl: 'https://image.tmdb.org/t/p/original/vGDifxN2PnO69rnpg6FoWkocFCD.jpg',
    },
  },
];

/** Method for mocking an ES6 default export */
jest.mock('../../services/movieService');
getCastMembers.mockImplementation(() => Promise.resolve(mockData));

describe('people tests', () => {
  it('should return a list of cast members', async () => {
    const movies = await cast({ id: 23587 });
    expect(getCastMembers).toHaveBeenCalledWith(23587);
    expect(movies).toEqual(mockData);
  });
});
