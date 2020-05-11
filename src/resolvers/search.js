
/* eslint-disable consistent-return */
import { BASE_URL } from '../constants';
import getPageInfo from './pagination';
import get from '../services/restService';
import { buildMovies } from './movies';

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

const searchBuilder = async (url, imageSize, first) => {
  const data = await get(url);
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
};

const search = async (root, { imageSize, filter, first = null }) => {
  let url = `${BASE_URL}/search/movie?`;
  // TODO: searchText is required otherwise API returns query required error
  if (filter.searchText) {
    url += `query=${filter.searchText}&`;
  }
  return searchBuilder(url, imageSize, first);
};

export default search;
