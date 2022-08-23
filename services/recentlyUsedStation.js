import { models } from '../models/index.js';

export class RecentlyUsedStationServices {
  constructor() {}

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

  async deleteRecently(userId) {
    await models.RecentlyUsedStation.destroyRecently(userId);
    return;
  }
}
