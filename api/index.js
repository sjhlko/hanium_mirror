import { Router } from 'express';
import user from './routes/user.js';
import auth from './routes/auth.js';
import station from './routes/station.js'

export default () => {
  const app = Router();
  user(app);
  auth(app);
  station(app);
  return app;
};
