import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routers from "./routes/index.route";
import DataConnect from './config/DataConnect';
import RedisClient from './config/RedisClient';

// import syncService, { SyncServiceControl } from './modules/autoComplete/util/syncService';
// let syncServiceInstance: SyncServiceControl | null = null;

// Connect to databases
DataConnect.open();
RedisClient.connect();

// // Initialize sync service asynchronously
// (async () => {
//   try {
//     syncServiceInstance = await syncService.startSyncService(10000);
//     // console.log('Sync service started successfully');
//   } catch (error) {
//     console.error('Failed to start sync service:', error);
//   }
// })();

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
