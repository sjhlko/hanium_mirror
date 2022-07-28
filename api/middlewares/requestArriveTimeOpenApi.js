import request from 'request';
import config from '../../config/index.js';
//import { models } from '../../models/index.js';
import { StationService } from '../../services/station.js';
const stationServiceInstance = new StationService();

const requestArriveTimeOpenApi = async (req, res, next) => {
  const ArriveTimekey = config.arriveTimeKey;

  const station = await stationServiceInstance.getStationByStationId(req.params.stationId);

  const lineId = station.dataValues.line_id;
  const stationName = station.dataValues.station_name;
  const stationId = station.dataValues.station_id;

  const apiAddress = encodeURI(
    `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${stationName}`,
  );

  request(apiAddress, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      req.openApiResult = body;
      req.lineId = lineId;
      req.stationId = stationId;
      req.stationName = stationName;
      next();
    } else {
      console.log('에러');
      next();
    }
  });
};

export default requestArriveTimeOpenApi;
