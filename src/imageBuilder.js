import NodeCache from 'node-cache';
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from './constants';
import { handleResponse, handleError } from './fetchHandler';

const DEFAULT_IMAGE_SIZE = 'w154';
const CACHE_KEY = '__movie_api_config__';
const cache = new NodeCache();

// eslint-disable-next-line consistent-return
const configuration = async () => {
  const url = `${BASE_URL}/configuration?api_key=${ENV_VARS.API_KEY}`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { images } = await handleResponse(response);
    return ({
      imageBaseUrl: images.secure_base_url,
      imagePosterSizes: images.poster_sizes,
    });
  } catch (err) {
    handleError(err, url);
  }
};

/*
Structure of image https://image.tmdb.org/t/p/w154/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
*/
const buildImage = async (posterPath) => {
  let cachedImageConfiguration = cache.get(CACHE_KEY);
  try {
    if (!cachedImageConfiguration) {
      cachedImageConfiguration = await configuration();
      cache.set(CACHE_KEY, cachedImageConfiguration);
    }
    const { imageBaseUrl, imagePosterSizes } = cachedImageConfiguration;
    const imageSize = imagePosterSizes.find((item) => item === DEFAULT_IMAGE_SIZE);
    if (imageSize || !posterPath) {
      return `${imageBaseUrl}${imageSize}${posterPath}`;
    }
    console.log(`Image size ${DEFAULT_IMAGE_SIZE} not found in ${imagePosterSizes.toString()}`);
  } catch (err) {
    console.log(`An Unhandled exception occurred ${err}`);
  }
  return 'https://via.placeholder.com/154x231';
};

export default buildImage;
