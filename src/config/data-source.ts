import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Astrologer } from '../entities/Astrologer';
import { OAuthAccessToken } from '../entities/OAuthAccessToken';
// import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Set to true for development; false for production
  logging: false,
  entities: [Astrologer, OAuthAccessToken], // Specify your entities here
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
