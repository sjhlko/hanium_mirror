import request from 'request';
import config from '../../config/index.js';
import { models } from '../../models/index.js';

const requestArriveTimeOpenApi = async (req, res, next) => {
  const ArriveTimekey = config.arriveTimeKey;
  const station = await models.Station.findByStationId(req.params.stationId, [
    'station_name',
  ]);

  const stationName = station.dataValues.station_name;
  const apiAddress = encodeURI(
    `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${stationName}`,
  );
  request(apiAddress, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      req.arriveTimeResult = body;
      req.stationId = req.params.stationId;
      next();
    } else {
      console.log('에러');
      next();
    }
  });
};

export default requestArriveTimeOpenApi;
