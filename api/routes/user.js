import { Router } from 'express';
import users from '../../models/user.js';
const route = Router();

export default app => {
  app.use('/users', route);

  //유저 정보 확인
  route.get('/:id', async (req, res) => {
    const user = await users.findOne({
      where: { user_id: req.params.id },
    });
    console.log(user);
    return res.json(user);
  });
};
