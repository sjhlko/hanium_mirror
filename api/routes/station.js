import { Router } from 'express';
import { StationService } from '../../services/station.js';
import { StationMiddleware } from '../middlewares/station.js';
const route = Router();
const stationServiceInstance = new StationService();
const stationMiddlewareInstance = new StationMiddleware();

export default app => {
  app.use('/stations', route);

  // 역 정보 확인
  route.get('/:stationId', stationMiddlewareInstance.getRealTime , async (req, res) => {
    const stationId = req.params.stationId;
    const station = await stationServiceInstance.getStationByStationId(stationId);
    
    return res.json(station);
  });
};
