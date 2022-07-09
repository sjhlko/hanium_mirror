import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class line extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    line_id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    line_name: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'line',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "line_id" },
        ]
      },
    ]
  });
  }
}
