import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routers from "./api/routes";
import DataConnect from './config/DataConnect';
import './test';
DataConnect.open();
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization, Origin, X-Requested-With, Accept' + 'Content-Type',
      'Authorization',
      'Origin',
      'X-Requested-With',
      'Accept',
    ],
  }),
);
app.use(json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(routers);

export default app;
