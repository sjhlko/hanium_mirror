import { Router } from 'express';
import { StationService } from '../../services/station.js';
import middlewares from '../middlewares/index.js';
const route = Router();
const stationServiceInstance = new StationService();

export default app => {
  app.use('/stations', route);
  
  //도착정보 확인
  route.get(
    '/arrive-info/:stationId',
    middlewares.requestArriveTimeOpenApi,
    middlewares.getRealTime,
    async (req, res) => {
      const station = {
        arriveInfo: req.realTimeArray
      };
      
      return res.json(station);
    },
  );

  app.use((error, req, res, next) => {
    return res.json({errorMessage: error.message});
  })
};
