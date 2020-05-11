/* eslint-disable consistent-return */
import fetch from 'node-fetch';
import { handleResponse, handleError } from './fetchHandler';

const getMovies = async (url) => {
  console.log(`Connecting to ${url}`);
  try {
    const response = await fetch(url);
    return await handleResponse(response);
  } catch (err) {
    handleError(err, url);
  }
};

export default getMovies;
