import movieBuilder from './movieBuilder';
import get from '../restService';

const url = 'https://api.themoviedb.org/3/movie/23587/recommendations?';

const mockData = {
  results: [
    {
      popularity: 606.107,
      vote_count: 3321,
      poster_path: '/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
      id: 419704,
      original_language: 'en',
      title: 'Ad Astra',
      vote_average: 6,
      overview: 'The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.',
      release_date: '2019-09-17',
      runtime: 93,
      backdrop_path: null,
    },
  ],
};

// mocks
jest.mock('../restService');
get.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./imageBuilder', () => ({
  buildPosterImage: jest.fn(() => Promise.resolve('https://image.tmdb.org/t/p/w154/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg')),
  buildBackDropImage: jest.fn(() => Promise.resolve(null)),
}));

describe('movieBuilder tests', () => {
  it('should return a list of movies', async () => {
    const expected = [{
      id: 419704,
      title: 'Ad Astra',
      overview: 'The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.',
      voteAverage: 6,
      voteCount: 3321,
      releaseDate: '2019-09-17',
      originalLanguage: 'en',
      popularity: 606.107,
      homePage: null,
      runTime: 93,
      genres: [],
      images: {
        poster: 'https://image.tmdb.org/t/p/w154/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg',
        backDrop: null,
      },
    }];
    const movies = await movieBuilder(url, 'w154');
    expect(get).toHaveBeenCalledWith(url);
    expect(movies).toEqual(expected);
  });
});
