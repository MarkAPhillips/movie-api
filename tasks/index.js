/* eslint-disable no-console */
import first from 'lodash/first';
import FeaturedMovieModel from '../db/models/featuredMovie';
import { connect, disconnect } from '../db';
import { getTrending } from '../services/movieService';

const tasks = async () => {
  console.log(`Starting feature job at ${new Date()}`);
  const results = await getTrending();
  const { id: movieId } = first(results);
  console.log(`Fetching movie data completed at ${new Date()}`);
  connect();
  const featuredMovie = new FeaturedMovieModel({ movieId });
  await featuredMovie.save();
  disconnect();
  console.log(`Completed feature job at ${new Date()}`);
};

tasks();
