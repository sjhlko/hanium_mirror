import _sequelize from 'sequelize';
const DataTypes = _sequelize.DataTypes;
import _bookmarked_station from './bookmarked_station.js';
import _line from './line.js';
import _passenger from './passenger.js';
import _recently_used_station from './recently_used_station.js';
import _station from './station.js';
import _station_exit from './station_exit.js';
import _time_table from './time_table.js';
import _user from './user.js';

export default function initModels(sequelize) {
  const bookmarked_station = _bookmarked_station.init(sequelize, DataTypes);
  const line = _line.init(sequelize, DataTypes);
  const passenger = _passenger.init(sequelize, DataTypes);
  const recently_used_station = _recently_used_station.init(
    sequelize,
    DataTypes,
  );
  const station = _station.init(sequelize, DataTypes);
  const station_exit = _station_exit.init(sequelize, DataTypes);
  const time_table = _time_table.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  station.belongsToMany(station, {
    as: 'line_id_stations',
    through: passenger,
    foreignKey: 'statn_id',
    otherKey: 'line_id',
  });
  station.belongsToMany(station, {
    as: 'statn_id_stations',
    through: passenger,
    foreignKey: 'line_id',
    otherKey: 'statn_id',
  });
  station.belongsToMany(station, {
    as: 'line_id_station_station_exits',
    through: station_exit,
    foreignKey: 'statn_id',
    otherKey: 'line_id',
  });
  station.belongsToMany(station, {
    as: 'statn_id_station_station_exits',
    through: station_exit,
    foreignKey: 'line_id',
    otherKey: 'statn_id',
  });
  station.belongsToMany(station, {
    as: 'line_id_station_time_tables',
    through: time_table,
    foreignKey: 'statn_id',
    otherKey: 'line_id',
  });
  station.belongsToMany(station, {
    as: 'statn_id_station_time_tables',
    through: time_table,
    foreignKey: 'line_id',
    otherKey: 'statn_id',
  });
  station.belongsTo(line, { as: 'line', foreignKey: 'line_id' });
  line.hasMany(station, { as: 'stations', foreignKey: 'line_id' });
  bookmarked_station.belongsTo(station, {
    as: 'statn',
    foreignKey: 'statn_id',
  });
  station.hasMany(bookmarked_station, {
    as: 'bookmarked_stations',
    foreignKey: 'statn_id',
  });
  bookmarked_station.belongsTo(station, { as: 'line', foreignKey: 'line_id' });
  station.hasMany(bookmarked_station, {
    as: 'line_bookmarked_stations',
    foreignKey: 'line_id',
  });
  passenger.belongsTo(station, { as: 'statn', foreignKey: 'statn_id' });
  station.hasMany(passenger, { as: 'passengers', foreignKey: 'statn_id' });
  passenger.belongsTo(station, { as: 'line', foreignKey: 'line_id' });
  station.hasMany(passenger, { as: 'line_passengers', foreignKey: 'line_id' });
  recently_used_station.belongsTo(station, {
    as: 'statn',
    foreignKey: 'statn_id',
  });
  station.hasMany(recently_used_station, {
    as: 'recently_used_stations',
    foreignKey: 'statn_id',
  });
  recently_used_station.belongsTo(station, {
    as: 'line',
    foreignKey: 'line_id',
  });
  station.hasMany(recently_used_station, {
    as: 'line_recently_used_stations',
    foreignKey: 'line_id',
  });
  station_exit.belongsTo(station, { as: 'statn', foreignKey: 'statn_id' });
  station.hasMany(station_exit, {
    as: 'station_exits',
    foreignKey: 'statn_id',
  });
  station_exit.belongsTo(station, { as: 'line', foreignKey: 'line_id' });
  station.hasMany(station_exit, {
    as: 'line_station_exits',
    foreignKey: 'line_id',
  });
  time_table.belongsTo(station, { as: 'statn', foreignKey: 'statn_id' });
  station.hasMany(time_table, { as: 'time_tables', foreignKey: 'statn_id' });
  time_table.belongsTo(station, { as: 'line', foreignKey: 'line_id' });
  station.hasMany(time_table, {
    as: 'line_time_tables',
    foreignKey: 'line_id',
  });
  bookmarked_station.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(bookmarked_station, {
    as: 'bookmarked_stations',
    foreignKey: 'user_id',
  });
  recently_used_station.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(recently_used_station, {
    as: 'recently_used_stations',
    foreignKey: 'user_id',
  });

  return {
    bookmarked_station,
    line,
    passenger,
    recently_used_station,
    station,
    station_exit,
    time_table,
    user,
  };
}
