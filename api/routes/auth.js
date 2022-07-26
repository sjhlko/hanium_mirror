import { Router } from 'express';
import { AuthService } from '../../services/auth.js';

const route = Router();
const AuthServiceInstance = new AuthService();

export default app => {
  app.use('/auth', route);

  //새로운 유저 등록
  route.post('/register', async (req, res) => {
    console.log(req.body);
    await AuthServiceInstance.register(req.body);
    return res.json('register successed');
  });
};
