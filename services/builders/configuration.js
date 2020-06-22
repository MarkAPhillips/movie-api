import NodeCache from 'node-cache';
import imageConfiguration from '../../api/resolvers/configuration';

const CACHE_KEY = '__movie_api_config__';
const CACHE_EXPIRE_SECONDS = 86400; // 1 day in seconds
const cache = new NodeCache();

const getImageConfig = async () => {
  let cachedImageConfiguration = cache.get(CACHE_KEY);
  if (!cachedImageConfiguration) {
    cachedImageConfiguration = await imageConfiguration();
    cache.set(CACHE_KEY, cachedImageConfiguration, CACHE_EXPIRE_SECONDS);
  }
  return cachedImageConfiguration;
};

export default getImageConfig;
