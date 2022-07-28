import Sequelize from 'sequelize';
import config from '../config/index.js';

import bookmarked_station from './bookmarked_station.js';
import congestion from './congestion.js';
import line from './line.js';
import passenger from './passenger.js';
import recently_used_station from './recently_used_station.js';
import station from './station.js';
import station_exit from './station_exit.js';
import time_table from './time_table.js';
import user from './user.js';

const models = {
  BookmarkedStation: bookmarked_station,
  Congestion: congestion,
  Line: line,
  Passenger: passenger,
  RecentlyUsedStation: recently_used_station,
  Station: station,
  StationExit: station_exit,
  TimeTable: time_table,
  User: user,
};

const sequelize = new Sequelize(config.databaseURL, {
  query: { raw: true },
});

export { models };
export default sequelize;
