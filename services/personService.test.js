import personBuilder from './builders/personBuilder';
import personCreditBuilder from './builders/personCreditBuilder';

import {
  getPersonById,
  getPersonMovieCredits,
} from './personService';

const mockData = [];

// mocks
jest.mock('./builders/personBuilder');
personBuilder.mockImplementation(() => Promise.resolve(mockData));

jest.mock('./builders/personCreditBuilder');
personCreditBuilder.mockImplementation(() => Promise.resolve(mockData));

describe('personService tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should verify personBuilder is called with the correct params for getPersonById', async () => {
    getPersonById('original', 1234);
    expect(personBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/person/1234?', 'original');
  });

  it('should verify personCreditBuilder is called with the correct params for getPersonMovieCredits', async () => {
    getPersonMovieCredits(1234);
    expect(personCreditBuilder).toHaveBeenCalledWith('https://api.themoviedb.org/3/person/1234/credits?');
  });
});
