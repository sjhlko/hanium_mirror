import Sequelize from 'sequelize';
import config from '../config/index.js';

const sequelize = new Sequelize(config.databaseURL);

export default sequelize;
