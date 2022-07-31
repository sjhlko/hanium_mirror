import { Router } from 'express';
import { StationService } from '../../services/station.js';
import middlewares from '../middlewares/index.js';
const route = Router();
const stationServiceInstance = new StationService();

export default app => {
  app.use('/stations', route);

  // 역 정보 및 도착정보 확인
  route.get(
    '/arrive-info/:stationId',
    middlewares.requestArriveTimeOpenApi,
    middlewares.getRealTime,
    middlewares.makeLinesArrayByStationIds,
    async (req, res) => {
      const station = {
        stationName: req.stationName,
        lines: req.lines,
        arriveInfo: req.realTimeArray,
      };
      console.log(station);
      return res.json(station);
    },
  );

  route.get(
    '/gps/:longtitude/:latitude',
    middlewares.getNearestStation,
    async (req, res) => {
    },
  );
};
