/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from '../constants';
import { handleResponse, handleError } from '../services/fetchHandler';

export const imageConfiguration = async () => {
  const url = `${BASE_URL}/configuration?api_key=${ENV_VARS.API_KEY}`;
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    const { images } = await handleResponse(response);
    return ({
      baseUrl: images.secure_base_url,
      imageSizes: images.poster_sizes,
    });
  } catch (err) {
    handleError(err, url);
  }
};
