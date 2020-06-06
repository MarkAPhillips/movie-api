import movieBuilder from './helpers/movieBuilder';
import castBuilder from './helpers/castMemberBuilder';
import certificationBuilder from './helpers/certificationBuilder';

import {
  getTrending,
  getPopular,
  getSimilar,
  getRecommended,
  getMovieById,
  getCastMembers,
  getCertifications,
} from './movieService';

const mockData = [];

// mocks
jest.mock('./helpers/movieBuilder');
movieBuilder.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./helpers/castMemberBuilder');
castBuilder.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./helpers/certificationBuilder');
certificationBuilder.mockImplementation(() => Promise.resolve(mockData));

describe('movieService tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify movieBuilder is called with the correct params for getTrending', async () => {
    getTrending('original');
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/trending/movie/day?', 'original');
  });

  it('should verify movieBuilder is called with the correct params for getTrending for period week', async () => {
    getTrending('original', 'week');
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/trending/movie/week?', 'original');
  });

  it('should verify movieBuilder is called with the correct params for getPopular', async () => {
    getPopular('original');
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/popular?', 'original');
  });

  it('should verify movieBuilder is called with the correct params for getSimilar', async () => {
    getSimilar(1234);
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/1234/similar?');
  });

  it('should verify movieBuilder is called with the correct params for getRecommended', async () => {
    getRecommended(1234);
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/1234/recommendations?');
  });

  it('should verify movieBuilder is called with the correct params for getMovieById', async () => {
    getMovieById('original', 1234);
    expect(movieBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/1234?', 'original');
  });

  it('should verify castMemberBuilder is called with the correct params for getCastMembers', async () => {
    getCastMembers(1234);
    expect(castBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/1234/credits?');
  });

  it('should verify certificationBuilder is called with the correct params for getCertifications', async () => {
    getCertifications(1234);
    expect(certificationBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/movie/1234/release_dates?');
  });
});
