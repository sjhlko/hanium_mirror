import { models } from '../models/index.js';

export class AuthService {
  constructor() {
    this.userAttributes = ['user_id', 'speed', 'age_range', 'gender'];
  }

  async register(newUser) {
    return await models.User.createUser(newUser);
  }
}
