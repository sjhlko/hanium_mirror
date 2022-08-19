import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class congestion extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    station_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'station',
        key: 'station_id'
      }
    },
    line_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'station',
        key: 'line_id'
      }
    },
    congestion: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'congestion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "month" },
          { name: "time" },
          { name: "station_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_station_TO_congestion_1",
        using: "BTREE",
        fields: [
          { name: "station_id" },
        ]
      },
      {
        name: "FK_station_TO_congestion_2",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
