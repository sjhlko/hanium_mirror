import { Router } from 'express';
import { StationService } from '../../services/station.js';
import middlewares from '../middlewares/index.js';
const route = Router();
const stationServiceInstance = new StationService();

export default app => {
  app.use('/stations', route);

  // 역 정보 확인
  route.get(
    '/:stationId',
    middlewares.requestArriveTimeOpenApi,
    middlewares.getRealTime,
    async (req, res) => {
      const station = {
        stationName: req.stationName,
        //stationId: req.stationId,
        lines: req.lines,
        arriveInfo: req.realTimeArray
      }
      console.log(station);
      return res.json(station);
    },
  );
};
