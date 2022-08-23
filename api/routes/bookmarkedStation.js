import { Router } from 'express';
import { BookmarkedStationService } from '../../services/bookmarkedStation.js';
const route = Router();
const BookmarkedStationServiceInstance = new BookmarkedStationService();

export default app => {
  app.use(
    '/users/:userId/bookmarked-stations',
    (req, res, next) => {
      req.userId = req.params.userId;
      next();
    },
    route,
  );

  //북마크 된 역 조회
  route.get('/', async (req, res) => {
    const userId = req.userId;
    const result = await BookmarkedStationServiceInstance.getBookmarkedStation(
      userId,
    );
    return res.json(result);
  });

  //북마크 역 수정
  route.post('/', async (req, res) => {
    const userId = req.userId;
    const stationId = req.body.stationId;
    await BookmarkedStationServiceInstance.updateBookmark(userId, stationId);
    return res.sendStatus(201);
  });

  //북마크 여부 확인
  //   route.get('/:stationId', async (req, res) => {
  //     const userId = req.userId;
  //     const stationId = req.params.stationId;
  //   });
};
