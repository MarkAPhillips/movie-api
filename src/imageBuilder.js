import memCache from 'memory-cache';
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from './constants';
import { handleResponse, handleError } from './fetchHandler';

const DEFAULT_IMAGE_SIZE = 'w92';

const configuration = () => {
  const url = `${BASE_URL}/configuration?api_key=${ENV_VARS.API_KEY}`;
  console.log(`Connecting to ${url}`);
  return fetch(url)
    .then(handleResponse)
    .then(({ images }) => ({
      imageBaseUrl: images.secure_base_url,
      imagePosterSizes: images.poster_sizes,
    }))
    .catch((err) => handleError(err, url));
};

/*
Structure of image https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
*/
const buildImage = async (posterPath, key) => {
  const cachedResponse = memCache.get(key);
  if (cachedResponse) return cachedResponse;
  try {
    const imageConfiguration = await configuration();
    const { imageBaseUrl, imagePosterSizes } = imageConfiguration;
    const imageSize = imagePosterSizes.find((item) => item === DEFAULT_IMAGE_SIZE);
    if (imageSize || !posterPath) {
      memCache.put(key, `${imageBaseUrl}${imageSize}${posterPath}`);
      return memCache.get(key);
    }
    console.log(`Image size ${DEFAULT_IMAGE_SIZE} not found in ${imagePosterSizes.toString()}`);
  } catch (err) {
    console.log(`An Unhandled exception occurred ${err}`);
  }
  return 'https://via.placeholder.com/92'; // TODO: Review placeholder image size
};

export default buildImage;
