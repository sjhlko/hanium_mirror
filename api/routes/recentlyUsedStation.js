import { Router } from 'express';
import { RecentlyUsedStationServices } from '../../services/recentlyUsedStation.js';
const route = Router();
const RecentlyUsedStationServiceInstance = new RecentlyUsedStationServices();

export default app => {
  app.use(
    '/users/:userId/recently-used-stations',
    (req, res, next) => {
      req.userId = req.params.userId;
      next();
    },
    route,
  );

  //최근 사용 역 삭제
  route.delete('/', async (req, res) => {
    const userId = req.userId;
    await RecentlyUsedStationServiceInstance.deleteRecently(userId);
    return res.sendStatus(204);
  });

  //최근 사용 역 조회
  route.get('/', async (req, res) => {
    const userId = req.userId;
    const result = await RecentlyUsedStationServiceInstance.getRecently(userId);
    return res.json(result);
  });

  //최근 사용 역 생성
  route.post('/', async (req, res) => {
    const userId = req.userId;
    const stationId = req.body.stationId;
    const lineId = req.body.lineId;
    await RecentlyUsedStationServiceInstance.createRecently(
      userId,
      stationId,
      lineId,
    );
    return res.sendStatus(201);
  });
};
