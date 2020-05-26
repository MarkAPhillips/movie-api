/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import colors from 'colors/safe';
import { handleResponse, handleError } from './fetchHandler';
import { ENV_VARS } from '../../constants';

const get = async (url) => {
  const urlWithApiKey = `${url}api_key=${ENV_VARS.API_KEY}`;
  console.log(colors.blue(`Connecting to ${urlWithApiKey}`));
  try {
    const response = await fetch(urlWithApiKey);
    return await handleResponse(response);
  } catch (err) {
    handleError(err, url);
  }
};

export default get;
