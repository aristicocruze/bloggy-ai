import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';
import routes from './routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);

app.use(helmet());

// routes.
app.use('/api/v1', routes);

export default app;
