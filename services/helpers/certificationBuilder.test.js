import certificationBuilder from './certificationBuilder';
import get from '../restService';

const url = 'https://api.themoviedb.org/3/movie/23587/release_dates';

const mockData = {
  id: 514847,
  results: [
    {
      iso_3166_1: 'AU',
      release_dates: [
        {
          certification: 'MA15+',
          iso_639_1: '',
          note: '',
          release_date: '2020-04-09T00:00:00.000Z',
          type: 3,
        },
      ],
    },
    {
      iso_3166_1: 'UA',
      release_dates: [
        {
          certification: '',
          iso_639_1: '',
          note: '',
          release_date: '2020-04-23T00:00:00.000Z',
          type: 3,
        },
      ],
    },
  ],
};

// mocks
jest.mock('../restService');
get.mockImplementation(() => Promise.resolve(mockData));

describe('certificationBuilder tests', () => {
  it('should return a list of certifications', async () => {
    const expected = [{
      countryCode: 'AU',
      certification: 'MA15+',
    }];
    const movies = await certificationBuilder(url);
    expect(get).toHaveBeenCalledWith(url);
    expect(movies).toEqual(expected);
  });
});
