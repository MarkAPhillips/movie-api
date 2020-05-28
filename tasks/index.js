import colors from 'colors/safe';
import first from 'lodash/first';
import FeaturedMovieModel from '../mongodb/models/featuredMovie';
import { connect, disconnect } from '../mongodb';
import { getPopular } from '../services/movieService';

const tasks = async () => {
  console.log(colors.yellow(`Starting feature job at ${new Date()}`));
  const results = await getPopular();
  const { id: movieId } = first(results);
  console.log(colors.yellow(`Fetching movie data completed at ${new Date()}`));
  connect();
  const featuredMovie = new FeaturedMovieModel({ movieId });
  await featuredMovie.save();
  disconnect();
  console.log(colors.green(`Completed feature job at ${new Date()}`));
};


tasks();
