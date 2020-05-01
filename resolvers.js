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
    .catch(handleError);
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
                vote_average: item.vote_average
                }));
            })
        .catch(handleError);
    };