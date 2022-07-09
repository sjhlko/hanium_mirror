import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class recently_used_station extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
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
    }
  }, {
    sequelize,
    tableName: 'recently_used_station',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
          { name: "statn_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_station_TO_recently_used_station_1",
        using: "BTREE",
        fields: [
          { name: "statn_id" },
        ]
      },
      {
        name: "FK_station_TO_recently_used_station_2",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
