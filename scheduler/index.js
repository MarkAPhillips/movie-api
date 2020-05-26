import { CronJob } from 'cron';
import colors from 'colors/safe';
import first from 'lodash/first';
import FeaturedMovieModel from '../mongodb/models/featuredMovie';
import { connect, disconnect } from '../mongodb';
import { getPopular } from '../src/services/movieService';
import { ENV_VARS } from '../constants';

const featuredMovieJob = async () => {
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

console.log(colors.green(`Scheduler initialised at ${new Date()}`));

const job = new CronJob(ENV_VARS.SCHEDULE, featuredMovieJob);

job.start();
