import { Sequelize } from 'sequelize-typescript';
import { Post } from '../modules/api/v1/posts/post.model';
import logger from '../utils/logger';

// import models

const sequelize = new Sequelize(process.env.POSTGRE_URL || '', {
  dialect: 'postgres',
  logging:
    process.env.NODE_ENV === 'production'
      ? false
      : (query: string) => {
          logger.info(query);
        },
});

sequelize.addModels([Post]);

// (async () => {
//   await sequelize.sync({ alter: true });
// })();

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('Connection to database has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

export async function disconnectFromDatabase() {
  try {
    await sequelize.close();
    logger.info('Connection to database has been closed successfully.');
  } catch (error) {
    logger.error('Unable to disconnect from the database:', error);
  }
}
