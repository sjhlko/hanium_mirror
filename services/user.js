import { models } from '../models/index.js';

export class UserService {
  constructor() {
    this.userAttributes = ['user_id', 'speed', 'age_range', 'gender'];
  }

  async getUserById(userId) {
    return await models.User.findById(userId, this.userAttributes);
  }
}
