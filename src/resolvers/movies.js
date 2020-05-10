/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from '../constants';
import { handleResponse, handleError } from '../fetchHandler';
import { buildImage } from '../imageBuilder';
import getPageInfo from './pagination';

const movieMapper = (item, imageUrl) => (
  {
    id: item.id,
    title: item.title,
    overview: item.overview,
    voteAverage: item.vote_average,
    voteCount: item.vote_count,
    releaseDate: item.release_date,
    originalLanguage: item.original_language,
    popularity: item.popularity,
    imageUrl,
  }
);

const buildMovies = async (movies, imageSize) => {
  const output = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const movie of movies) {
    // eslint-disable-next-line no-await-in-loop
    const imageUrl = await buildImage(movie.poster_path, imageSize);
    output.push(movieMapper(movie, imageUrl));
  }
  return output;
};

const getTotalCount = (data) => data.total_results || data.results.length;

const getEdges = async (data, imageSize, filter) => {
  let output = [];
  const { results } = data;
  if (filter.first) {
    output = results.slice(0, filter.first);
  } else {
    output = [...results];
  }
  const movies = await buildMovies(output, imageSize);
  return movies.map((node) => ({
    cursor: node.id,
    node,
  }));
};

const getMovies = async (url, imageSize, type, filter) => {
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    const totalCount = getTotalCount(data);
    const edges = await getEdges(data, imageSize, filter);
    // TODO: Check when empty resultset
    const [endCursor] = edges.slice(-1);
    const startCursor = edges[0];
    const pageInfo = getPageInfo(endCursor.cursor, startCursor.cursor);
    if (filter.text && type !== 'ALL') {
      console.log('Filter Trending and popular types');
    }
    return {
      edges,
      pageInfo,
      totalCount,
    };
  } catch (err) {
    handleError(err, url);
  }
};

const movies = async (root, { filter }) => {
  const { movieType, imageSize } = filter;
  let url = `${BASE_URL}/`;
  switch (movieType) {
    case 'TRENDING':
      url += 'trending/movie/day?';
      break;
    case 'POPULAR':
      url += 'movie/popular?';
      break;
    default:
      url += 'search/movie?';
      if (filter.text) {
        url += `?query=${filter.text}`;
      }
      break;
  }
  url += `api_key=${ENV_VARS.API_KEY}`;
  return getMovies(url, imageSize, movieType, filter);
};

export default movies;
