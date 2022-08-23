import { models } from '../models/index.js';

export class BookmarkedStationService {
  constructor() {}

  async getBookmarkedStation(userId) {
    return await models.BookmarkedStation.findByUserId(userId);
  }

  async updateBookmark(userId, stationId) {
    const station = await models.Station.findByStationId(stationId);
    let user, created;
    //console.log(station);
    [user, created] = await models.BookmarkedStation.findOrCreateBookmark(
      userId,
      station.station_id,
      station.line_id,
    );
    if (!created) {
      await models.BookmarkedStation.destroyBookmark(
        userId,
        station.station_id,
        station.line_id,
      );
      //console.log('삭제됨');
    }
    return created;
  }
}
