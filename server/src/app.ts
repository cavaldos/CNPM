import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routers from "./routes/index.route";
import DataConnect from './config/DataConnect';
import RedisClient from './config/RedisClient';

// Connect to databases
DataConnect.open();
RedisClient.connect();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: '*',
    exposedHeaders: ['Content-Length', 'X-Requested-With', 'Authorization'],
  }),
);
app.use(json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(routers);

export default app;
