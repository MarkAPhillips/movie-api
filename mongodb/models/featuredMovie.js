import mongoose from 'mongoose';

const FeaturedMovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    immutable: true,
  },
},
{
  timestamps: true,
});

const FeaturedMovieModel = mongoose.model('FeaturedMovie', FeaturedMovieSchema);

export default FeaturedMovieModel;
