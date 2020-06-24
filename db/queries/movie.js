import { connect, disconnect } from '..';
import FeaturedMovieModel from '../models/featuredMovie';

const getFeaturedMovie = async () => {
  connect();
  const movie = await FeaturedMovieModel.findOne({}).sort({ createdAt: -1 });
  disconnect();
  return movie.movieId;
};

export default getFeaturedMovie;
