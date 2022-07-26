import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class time_table extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
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
    time_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    weekday_up_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    weekday_down_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    saturday_up_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    saturday_down_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    holiday_up_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    holiday_down_time: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'time_table',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "time_id" },
          { name: "station_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_station_TO_time_table_1",
        using: "BTREE",
        fields: [
          { name: "station_id" },
        ]
      },
      {
        name: "FK_station_TO_time_table_2",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
