import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class station_exit extends Model {
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
    exit_name: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true
    },
    exit_latitude: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    exit_longtitude: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'station_exit',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exit_name" },
          { name: "statn_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_station_TO_station_exit_1",
        using: "BTREE",
        fields: [
          { name: "statn_id" },
        ]
      },
      {
        name: "FK_station_TO_station_exit_2",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
