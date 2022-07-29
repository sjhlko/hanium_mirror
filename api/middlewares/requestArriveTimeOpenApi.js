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
  //const stationId = station.station_id;

  const apiAddress = encodeURI(
    `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${stationName}`,
  );
 //line array 생성 코드
  const stations = await stationServiceInstance.getAllStationByStationName(stationName);
  const lines = await library.makeLinesArray(stations);
  request(apiAddress, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      req.openApiResult = body;
      req.lines = lines;
      //req.stationId = stationId;
      req.stationName = stationName;
      next();
    } else {
      console.log('에러');
      next();
    }
  });
};

export default requestArriveTimeOpenApi;
