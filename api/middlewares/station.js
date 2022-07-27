import request from 'request';
import convert from 'xml-js';
import { StationService } from '../../services/station.js';
import config from '../../config/index.js';

const ArriveTimekey = config.arriveTimeKey;
const stationServiceInstance = new StationService();

export class StationMiddleware {
  constructor() {}

  async requestOpenApi(station) {
    return new Promise(function (resolve, reject) {
      const apiAddress = encodeURI(
        `http://swopenAPI.seoul.go.kr/api/subway/${ArriveTimekey}/xml/realtimeStationArrival/0/5/${station}`,
      );
      request(apiAddress, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          resolve(body);
        } else {
          reject('error');
        }
      });
    });
  }

  async getRealTime(req, res, next) {
    const stationId = req.params.stationId;
    const station = await stationServiceInstance.getStationByStationId(stationId);
    const stationName = station.dataValues.station_name;
    console.log(stationName);
    const result = await this.requestOpenApi(stationName); 
    var xmlToJson = convert.xml2json(result , {
      compact: true,
      spaces: 4,
    });
    var data = JSON.parse(xmlToJson);
    console.log(data);
    next();
  }
}
