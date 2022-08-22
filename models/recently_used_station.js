import _sequelize from 'sequelize';
const { Model, Sequelize, fn } = _sequelize;

export default class recently_used_station extends Model {
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
        time_stamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      {
        sequelize,
        tableName: 'recently_used_station',
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
            name: 'FK_station_TO_recently_used_station_1',
            using: 'BTREE',
            fields: [{ name: 'station_id' }],
          },
          {
            name: 'FK_station_TO_recently_used_station_2',
            using: 'BTREE',
            fields: [{ name: 'line_id' }],
          },
        ],
      },
    );
  }

  static async countByUserId(userId) {
    const result = await this.findAll({
      attributes: [[fn('COUNT', this.sequelize.col('user_id')), 'count']],
      where: { user_id: userId },
    });
    const count = result[0].count;
    //console.log(count);
    return count;
  }

  static async deleteOldestByUserId(userId) {
    const result = await this.findAll({
      attributes: [[fn('MIN', this.sequelize.col('time_stamp')), 'oldest']],
      where: { user_id: userId },
    });
    return await this.destroy({
      where: { time_stamp: result[0].oldest },
    });
  }

  static async findByUserId(userId) {
    return await this.findAll({
      attributes: ['user_id', 'station_id', 'line_id'],
      where: { user_id: userId },
    });
  }

  static async findByUserIdAndStationId(userId, stationId) {
    return await this.findAll({
      attributes: ['station_id', 'line_id'],
      where: { user_id: userId, station_id: stationId },
    });
  }

  static async destroyRecently(userId) {
    return await this.destroy({
      where: { user_id: userId },
    });
  }

  static async updateRecently(userId, stationId, lineId) {
    return await this.update(
      {
        station_id: stationId,
        line_id: lineId,
        time_stamp: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      { where: { user_id: userId, line_id: lineId } },
    );
  }

  static async createRecently(userId, stationId, lineId) {
    return await this.create({
      user_id: userId,
      station_id: stationId,
      line_id: lineId,
    });
  }
}
