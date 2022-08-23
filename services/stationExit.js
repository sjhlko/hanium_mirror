import { models } from '../models/index.js';

export class StationExitService {
  constructor() {
      this.stationExitAttributes = ['station_id', 'line_id', 'exit_name', 'exit_latitude', 'exit_longtitude'];
  }

  async getAllBySquereCoordinates(squareCoordinates) {
    return await models.StationExit.findAllBySquareCoordinates(squareCoordinates, this.stationExitAttributes);
  }
}
