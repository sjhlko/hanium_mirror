import { Router } from 'express';
import { UserService } from '../../services/user.js';
const route = Router();
const userServiceInstance = new UserService();

export default app => {
  app.use('/users', route);

  //유저 정보 확인
  route.get('/:id', async (req, res) => {
    const userId = req.params.id;
    const user = await userServiceInstance.getUserById(userId);
    return res.json(user);
  });
};
