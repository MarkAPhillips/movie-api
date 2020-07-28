import { credits } from './movies';
import { getMovieCredits } from '../../services/movieService';

const mockData = [
  {
    cast: [
      {
        id: '52fe446ec3a368484e022aad',
        character: 'Eddie Marino',
        person: {
          id: 5694,
          name: 'Robert Forster',
          imageUrl:
            'https://image.tmdb.org/t/p/original/vGDifxN2PnO69rnpg6FoWkocFCD.jpg',
        },
      },
    ],
    crew: [
      {
        id: '52fe446ec3a368484e022aad',
        job: 'Director',
        name: 'George Lucas',
      },
    ],
  },
];

/** Method for mocking an ES6 default export */
jest.mock('../../services/movieService');
getMovieCredits.mockImplementation(() => Promise.resolve(mockData));

describe('movies tests', () => {
  it('should return a list of cast members for a movie', async () => {
    const movies = await credits({ id: 23587 },
      null, null, { variableValues: { creditsLimit: 10 } });
    expect(getMovieCredits).toHaveBeenCalledWith(23587, 10);
    expect(movies).toEqual(mockData);
  });
});
