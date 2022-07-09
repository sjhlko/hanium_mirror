import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class station extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    statn_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    line_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'line',
        key: 'line_id'
      }
    },
    statn_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'station',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "statn_id" },
          { name: "line_id" },
        ]
      },
      {
        name: "FK_line_TO_station_1",
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
