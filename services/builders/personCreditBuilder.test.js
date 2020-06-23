import personCreditBuilder from './personCreditBuilder';
import get from '../restService';

const url = 'https://api.themoviedb.org/3/person/10990/movie_credits?';

const mockData = {
  cast: [
    {
      character: 'Pauline Fossil',
      credit_id: '52fe43e9c3a368484e005729',
      release_date: '2008-08-26',
      vote_count: 194,
      video: false,
      adult: false,
      vote_average: 6.4,
      title: 'Ballet Shoes',
      genre_ids: [
        18,
        10751,
        10770,
      ],
      original_language: 'en',
      original_title: 'Ballet Shoes',
      popularity: 17.119,
      id: 20497,
      backdrop_path: null,
      overview: 'An unusual explorer named Gum and his kindly niece adopt three orphans -- Pauline, Petrova and Posy -- and raise them as sisters in 1930s London. But the girls must fend for themselves when Gum doesn\'t return from one of his adventures. Together, they nurture their passions for acting, aviation and ballet in this charming TV adaptation of Noel Streatfield\'s novel.',
      poster_path: '/bJAOuC0GLL1PHuefC8Ed8C0ja6m.jpg',
    },
    {
      character: 'Pauline Fossil',
      credit_id: '52fe43e9c3a368484e005729',
      release_date: null,
      vote_count: 194,
      video: false,
      adult: false,
      vote_average: 6.4,
      title: 'Ballet Shoes',
      genre_ids: [
        18,
        10751,
        10770,
      ],
      original_language: 'en',
      original_title: 'Ballet Shoes',
      popularity: 17.119,
      id: 20497,
      backdrop_path: null,
      overview: 'An unusual explorer named Gum and his kindly niece adopt three orphans -- Pauline, Petrova and Posy -- and raise them as sisters in 1930s London. But the girls must fend for themselves when Gum doesn\'t return from one of his adventures. Together, they nurture their passions for acting, aviation and ballet in this charming TV adaptation of Noel Streatfield\'s novel.',
      poster_path: '/bJAOuC0GLL1PHuefC8Ed8C0ja6m.jpg',
    },
  ],
};

// mocks
jest.mock('../restService');
get.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./imageBuilder', () => ({
  buildPosterImage: jest.fn(() => Promise.resolve('https://image.tmdb.org/t/p/original/bJAOuC0GLL1PHuefC8Ed8C0ja6m.jpg')),
  buildBackDropImage: jest.fn(() => Promise.resolve(null)),
}));

describe('personCreditBuilder tests', () => {
  it('should return a list of person movie credits', async () => {
    const expected = [{
      character: 'Pauline Fossil',
      id: '52fe43e9c3a368484e005729',
      movie: {
        id: 20497,
        title: 'Ballet Shoes',
        overview: 'An unusual explorer named Gum and his kindly niece adopt three orphans -- Pauline, Petrova and Posy -- and raise them as sisters in 1930s London. But the girls must fend for themselves when Gum doesn\'t return from one of his adventures. Together, they nurture their passions for acting, aviation and ballet in this charming TV adaptation of Noel Streatfield\'s novel.',
        voteAverage: 6.4,
        voteCount: 194,
        releaseDate: '2008-08-26',
        originalLanguage: 'en',
        popularity: 17.119,
        homePage: null,
        runTime: null,
        genres: [],
        images: {
          poster: 'https://image.tmdb.org/t/p/original/bJAOuC0GLL1PHuefC8Ed8C0ja6m.jpg',
          backDrop: null,
        },
      },
    }];
    const movies = await personCreditBuilder(url);
    expect(get).toHaveBeenCalledWith(url);
    expect(movies).toEqual(expected);
  });
});
