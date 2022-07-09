import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class passenger extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    statn_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'station',
        key: 'statn_id'
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
    passenger_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    passenger_num: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'passenger',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "passenger_time" },
          { name: "statn_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_station_TO_passenger_1",
        using: "BTREE",
        fields: [
          { name: "statn_id" },
        ]
      },
      {
        name: "FK_station_TO_passenger_2",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
