import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class station extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        station_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        line_id: {
          type: DataTypes.STRING(10),
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'line',
            key: 'line_id',
          },
        },
        station_name: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'station',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'station_id' }, { name: 'line_id' }],
          },
          {
            name: 'FK_line_TO_station_1',
            using: 'BTREE',
            fields: [{ name: 'line_id' }],
          },
        ],
      },
    );
  }
  static async findByStationId(stationId, attributes) {
    return await this.findOne({
      attributes: attributes,
      where: { station_id: stationId },
    });
  }

  static async findAllByStationName(stationName, attributes) {
    return await this.findAll({
      attributes: attributes,
      where: { station_name: stationName },
    });
  }
}
