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

const getEdges = async (data, imageSize, first) => {
  let output = [];
  const { results } = data;
  if (first) {
    output = results.slice(0, first);
  } else {
    output = [...results];
  }
  const movies = await buildMovies(output, imageSize);
  return movies.map((node) => ({
    cursor: node.id,
    node,
  }));
};

const getMovies = async (url, imageSize, first) => {
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const data = await handleResponse(response);
    const totalCount = getTotalCount(data);
    const edges = await getEdges(data, imageSize, first);
    // TODO: Check when empty resultset
    const [endCursor] = edges.slice(-1);
    const startCursor = edges[0];
    const pageInfo = getPageInfo(endCursor.cursor, startCursor.cursor);
    return {
      edges,
      pageInfo,
      totalCount,
    };
  } catch (err) {
    handleError(err, url);
  }
};

export const search = async (root, { imageSize, filter, first = null }) => {
  let url = `${BASE_URL}/search/movie?`;
  if (filter.searchText) {
    url += `query=${filter.searchText}&`;
  }
  url += `api_key=${ENV_VARS.API_KEY}`;
  return getMovies(url, imageSize, first);
};

export const movies = async (root, { imageSize, movieType, first }) => {
  let url = `${BASE_URL}/`;
  switch (movieType) {
    case 'TRENDING':
      url += 'trending/movie/day?';
      break;
    case 'POPULAR':
      url += 'movie/popular?';
      break;
    default:
      break;
  }
  url += `api_key=${ENV_VARS.API_KEY}`;
  return getMovies(url, imageSize, first);
};
