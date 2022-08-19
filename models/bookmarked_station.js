import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class bookmarked_station extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'user_id',
          },
        },
        station_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'station',
            key: 'station_id',
          },
        },
        line_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'station',
            key: 'line_id',
          },
        },
      },
      {
        sequelize,
        tableName: 'bookmarked_station',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [
              { name: 'user_id' },
              { name: 'station_id' },
              { name: 'line_id' },
            ],
          },
          {
            name: 'FK_station_TO_bookmarked_station_1',
            using: 'BTREE',
            fields: [{ name: 'station_id' }],
          },
          {
            name: 'FK_station_TO_bookmarked_station_2',
            using: 'BTREE',
            fields: [{ name: 'line_id' }],
          },
        ],
      },
    );
  }

  static async findByUserId(userId) {
    return await this.findAll({
      attributes: ['station_id', 'line_id'],
      where: { user_id: userId },
    });
  }

  static async destroyBookmark(userId, stationId, lineId) {
    return await this.destroy({
      where: { user_id: userId, station_id: stationId, line_id: lineId },
    });
  }

  static async destroyAllBookmark(userId) {
    return await this.destroy({
      where: { user_id: userId },
    });
  }

  static async findOrCreateBookmark(userId, stationId, lineId) {
    return await this.findOrCreate({
      where: {
        user_id: userId,
        station_id: stationId,
        line_id: lineId,
      },
      defaults: {
        user_id: userId,
        station_id: stationId,
        line_id: lineId,
      },
    });
  }
}
