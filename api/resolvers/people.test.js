import cast from './people';
import get from '../../services/restService';

const mockData = {
  id: 23587,
  cast: [
    {
      cast_id: 1,
      character: 'Eddie Marino',
      credit_id: '52fe446ec3a368484e022aad',
      gender: 2,
      id: 5694,
      name: 'Robert Forster',
      order: 0,
      profile_path: '/vGDifxN2PnO69rnpg6FoWkocFCD.jpg',
    },
  ],
};

jest.mock('../../services/helpers/imageBuilder', () => ({
  buildImage: jest.fn(() => Promise.resolve(
    'https://image.tmdb.org/t/p/original/vGDifxN2PnO69rnpg6FoWkocFCD.jpg',
  )),
}));

/** Method for mocking an ES6 default export */
jest.mock('../../services/restService');
get.mockImplementation(() => Promise.resolve(mockData));

describe('people tests', () => {
  it('should return a list of cast members', async () => {
    const expected = [
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
    const movies = await cast({ id: 23587 });
    expect(movies).toEqual(expected);
  });
});
