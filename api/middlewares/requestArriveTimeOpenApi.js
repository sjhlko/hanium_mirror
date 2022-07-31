import request from 'request';
import config from '../../config/index.js';
//import { models } from '../../models/index.js';
import { StationService } from '../../services/station.js';
import library from '../../library/index.js';

const stationServiceInstance = new StationService();

const requestArriveTimeOpenApi = async (req, res, next) => {
  const ArriveTimekey = config.arriveTimeKey;

  const station = await stationServiceInstance.getStationByStationId(
    req.params.stationId,
  );

  const stationName = station.station_name;

  const apiAddress = encodeURI(
    `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${stationName}`,
  );

  //const lines = await library.makeLinesArrayByStationIds(stations);

  request(apiAddress, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      req.openApiResult = body;
      req.stationName = stationName;
      next();
    } else {
      console.log('에러');
      next();
    }
  });
};

export default requestArriveTimeOpenApi;
