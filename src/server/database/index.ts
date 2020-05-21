import mongoose from 'mongoose';
import logger from '../utils/logger.util';

const databaseLoader = async (): Promise<void> => {
  if (!process.env.DATABASE) {
    logger('database', 'Env variable "DATABASE" is not defined!', 'error');
    return;
  }

  mongoose.connect(process.env.DATABASE as string, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then((): void => {
    logger('database', 'Database connected successfully.', 'info');
  }).catch((): void => {
    logger('database', 'Could not connnect to database.', 'error');
  });
};

export default databaseLoader;
