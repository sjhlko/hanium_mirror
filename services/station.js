import { models } from '../models/index.js';

export class StationService {
  constructor() {
    this.stationAttributes = ['station_id', 'line_id', 'station_name'];
  }

  async getStationByStationId(stationId) {
    return await models.Station.findByStationId(stationId, this.stationAttributes);
  }
}
