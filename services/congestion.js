import { models } from '../models/index.js';

export class CongestionService {
  constructor() {
    this.congestionAttributes = [
      'month',
      'time',
      'station_id',
      'line_id',
      'congestion',
    ];
  }

  async getCongestionByStationId(month, time, stationId) {
    return await models.Congestion.findByStationId(
      month,
      time,
      stationId,
      this.congestionAttributes,
    );
  }
}
