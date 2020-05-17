/* eslint-disable import/prefer-default-export */
import NodeCache from 'node-cache';
import imageConfiguration from '../configuration';

const CACHE_KEY = '__movie_api_config__';
const CACHE_EXPIRE_SECONDS = 86400; // 1 day in seconds
const cache = new NodeCache();

/*
Structure of image https://image.tmdb.org/t/p/w154/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
Return null if no poster path specified
*/
export const buildImage = async (posterPath, width) => {
  let cachedImageConfiguration = cache.get(CACHE_KEY);
  try {
    if (!cachedImageConfiguration) {
      cachedImageConfiguration = await imageConfiguration();
      cache.set(CACHE_KEY, cachedImageConfiguration, CACHE_EXPIRE_SECONDS);
    }
    const { baseUrl, imageSizes } = cachedImageConfiguration;
    const imageSize = imageSizes.find((item) => item === width);
    if (imageSize && posterPath) {
      return `${baseUrl}${imageSize}${posterPath}`;
    }
    if (!imageSize) {
      console.log(`Image size ${width} not found in ${imageSizes.toString()}`);
    }
  } catch (err) {
    console.log(`An Unhandled exception occurred ${err}`);
  }
  return null;
};
