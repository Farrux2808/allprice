import 'reflect-metadata';
import Application from './Application';
import * as dotenv from 'dotenv';

dotenv.config();

let options = {
  protocol: `${process.env.APP_PROTOCOL}`,
  host: `${process.env.HOST}`,
  port: parseInt(process.env.PORT),
  mongoUrl: `${process.env.MONGO_URL}`,
  secret: `${process.env.SESSION_STORE_SECRET}`,
};

export const app = new Application(options);
console.log(`${process.env.npm_package_name} v${process.env.npm_package_version}`);
app.start();
