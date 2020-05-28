
/* eslint-disable consistent-return */
import { BASE_URL } from '../../constants';
import get from '../../services/restService';
import { buildMovies } from '../../services/helpers/movieBuilder';
import getPageInfo from '../../services/helpers/pageInfoBuilder';

const getEdges = async (data, imageSize) => {
  const { results } = data;
  const movies = await buildMovies(results, imageSize);
  return movies.map((node) => ({
    node,
  }));
};

const searchBuilder = async (url, imageSize, page) => {
  const data = await get(url);
  const edges = await getEdges(data, imageSize);
  const pageNo = edges.length ? page : 1;
  return {
    edges,
    totalCount: data.total_results,
    page: pageNo,
    noOfPages: data.total_pages,
    pageInfo: getPageInfo(page, data.total_pages),
  };
};

const search = async (root, { imageSize, filter, page }) => {
  let url = `${BASE_URL}/search/movie?page=${page}&`;
  // TODO: searchText is required otherwise API returns query required error
  if (filter.searchText) {
    url += `query=${filter.searchText}&`;
  }
  return searchBuilder(url, imageSize, page);
};

export default search;
