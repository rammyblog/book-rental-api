import express from 'express';
import dotenv from 'dotenv-safe';
import { logRequest } from './logger';
import router from './routes';
import connect from './db/connect';
import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(deserializeUser);

app.listen(PORT, async () => {
  connect();
  app.use(logRequest);
  router(app);
});
