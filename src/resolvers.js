import fetch from 'node-fetch';
import { ENV_VARS, BASE_URL } from './constants';
import { handleResponse, handleError } from './fetchHandler';

export const trending = () => {
    const url = `${BASE_URL}/trending/movie/day?api_key=${ENV_VARS.API_KEY}`;
    return fetch(url)
    .then(handleResponse)
    .then(({ results }) => {
        return results.map((item) => ({
         id: item.id,
         title: item.title,
         overview: item.overview, 
         }));
     })
     .catch(err => handleError(err, url));
};

export const popular = () => {
    const url = `${BASE_URL}/movie/popular?api_key=${ENV_VARS.API_KEY}&language=en-US&page=1`
    return fetch(url)
        .then(handleResponse)
        .then(({ results }) => {
            return results.map((item) => ({
                id: item.id,
                title: item.title,
                overview: item.overview,
                voteAverage: item.vote_average
                }));
            })
        .catch(err => handleError(err, url));
    };

export const configuration = () => {
    const url = `${BASE_URL}/configuration?api_key=${ENV_VARS.API_KEY}`
    return fetch(url)
        .then(handleResponse)
        .then(({ images }) => {
            return {
                imageBaseUrl: images.secure_base_url,
                imagePosterSizes: images.poster_sizes,
                };
            })
        .catch(err => handleError(err, url));
    };