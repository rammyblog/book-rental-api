import express from 'express';
import dotenv from 'dotenv-safe';
import { logRequest } from './logger';

const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  //   logger.info(`App connected on ${PORT}`);
  app.use(logRequest);

  app.use('/', (req, res) => {
    res.send('Hello world');
  });
});
