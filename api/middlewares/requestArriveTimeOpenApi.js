import request from 'request';
import config from '../../config/index.js';
import { StationService } from '../../services/station.js';

const stationServiceInstance = new StationService();

const requestArriveTimeOpenApi = async (req, res, next) => {
  const ArriveTimekey = config.arriveTimeKey;
  const station = await stationServiceInstance.getStationByStationId(
    req.params.stationId,
  );
  const stationName = station.station_name;
  const apiAddress = encodeURI(
    `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/json/realtimeStationArrival/0/30/${stationName}`,
  );

  request(apiAddress, (error, response, body) => {
    if (error) {
      return next(new Error('failed to connect openApi'));
    }

    const openApiResult = JSON.parse(body);
  
    if ('realtimeArrivalList' in openApiResult) {
      req.openApiResult = openApiResult;
      req.stationName = stationName;
      next();
    } else {
      return res.json(openApiResult);
    }
   
  });
};

export default requestArriveTimeOpenApi;
