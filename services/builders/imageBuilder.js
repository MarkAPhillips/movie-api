/* eslint-disable no-console */
import getImageConfig from './configuration';

/*
Structure of image https://image.tmdb.org/t/p/w154/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
Return null if no poster path specified
*/

// TODO: Review these functions - possibly merge
export const buildPosterImage = async (posterPath, width) => {
  try {
    const { baseUrl, imageSizes } = await getImageConfig();
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

export const buildBackDropImage = async (backDropPath) => {
  const { baseUrl } = await getImageConfig();
  if (backDropPath) {
    return `${baseUrl}original${backDropPath}`;
  }
  return null;
};
