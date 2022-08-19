import { Router } from 'express';
import user from './routes/user.js';
import station from './routes/station.js';

export default () => {
  const app = Router();
  user(app);
  station(app);
  return app;
};
