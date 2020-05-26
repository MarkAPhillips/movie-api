import mongoose from 'mongoose';
import { ENV_VARS } from '../constants';

const uri = `mongodb+srv://dbUser:${ENV_VARS.DB_PWD}@move-watch-cluster-1u9rv.mongodb.net/movie-watch?authSource=admin&replicaSet=move-watch-cluster-shard-0&readPreference=primary&ssl=true`;

export const connect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const disconnect = () => mongoose.disconnect();
