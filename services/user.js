import { models } from '../models/index.js';

export class UserService {
  constructor() {
    this.userAttributes = ['user_id', 'speed', 'age_range', 'gender'];
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

  async deleteUser(userId) {
    await models.RecentlyUsedStation.destroyRecently(userId);
    await models.BookmarkedStation.destroyAllBookmark(userId);
    await models.User.destroyUser(userId);
    return;
  }
}
