import { BASE_URL } from '../constants';
import get from './restService';

const getImageConfiguration = async () => {
  const url = `${BASE_URL}/configuration?`;
  const { images } = await get(url);
  return ({
    baseUrl: images.secure_base_url,
    imageSizes: images.poster_sizes,
  });
};

export default getImageConfiguration;
