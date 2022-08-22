import { models } from '../models/index.js';

export class UserService {
  constructor() {
    this.userAttributes = ['user_id', 'speed', 'age_range', 'gender'];
    this.stationAttributes = ['station_id', 'line_id', 'station_name'];
  }

  async register(userInfo) {
    return await models.User.findOrCreateUser(userInfo);
  }

  async getUserById(userId) {
    return await models.User.findById(userId, this.userAttributes);
  }

  async updateUser(userId, userInfo) {
    return await models.User.updateUser(userId, userInfo);
  }

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
    return;
  }

  async deleteRecently(userId) {
    await models.RecentlyUsedStation.destroyRecently(userId);
    return;
  }

  async getRecently(userId) {
    return await models.RecentlyUsedStation.findByUserId(userId);
  }

  async createRecently(userId, stationId, lineId) {
    const valid = await models.RecentlyUsedStation.findByUserIdAndStationId(
      userId,
      stationId,
    );
    if (valid.length != 0) {
      return await models.RecentlyUsedStation.updateRecently(
        userId,
        stationId,
        lineId,
      );
    } else if ((await models.RecentlyUsedStation.countByUserId(userId)) >= 10) {
      await models.RecentlyUsedStation.deleteOldestByUserId(userId);
    }
    return await models.RecentlyUsedStation.createRecently(
      userId,
      stationId,
      lineId,
    );
  }

  async deleteUser(userId) {
    await models.RecentlyUsedStation.destroyRecently(userId);
    await models.BookmarkedStation.destroyAllBookmark(userId);
    await models.User.destroyUser(userId);
    return;
  }
}
