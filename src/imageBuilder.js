/* eslint-disable import/prefer-default-export */
import NodeCache from 'node-cache';
import { imageConfiguration } from './resolvers/configuration';

const CACHE_KEY = '__movie_api_config__';
const CACHE_EXPIRE_SECONDS = 86400; // 1 day in seconds
const cache = new NodeCache();

/*
Structure of image https://image.tmdb.org/t/p/w154/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
*/
export const buildImage = async (posterPath, width) => {
  let cachedImageConfiguration = cache.get(CACHE_KEY);
  try {
    if (!cachedImageConfiguration) {
      cachedImageConfiguration = await imageConfiguration();
      cache.set(CACHE_KEY, cachedImageConfiguration, CACHE_EXPIRE_SECONDS);
    }
    const { baseUrl, sizes } = cachedImageConfiguration;
    const size = sizes.find((item) => item === width);
    if (size || !posterPath) {
      return `${baseUrl}${size}${posterPath}`;
    }
    console.log(`Image size ${width} not found in ${sizes.toString()}`);
  } catch (err) {
    console.log(`An Unhandled exception occurred ${err}`);
  }
  // TODO: Review default output based on standard image
  return 'https://via.placeholder.com/154x231';
};
