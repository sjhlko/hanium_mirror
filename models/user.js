import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        speed: {
          type: DataTypes.DOUBLE(4, 2),
          allowNull: true,
        },
        age_range: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        gender: {
          type: DataTypes.CHAR(1),
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'user_id' }],
          },
        ],
      },
    );
  }

  static async findById(id, attributes) {
    return await this.findOne({
      attributes: attributes,
      where: { user_id: id },
    });
  }

  static async createUser(newUser) {
    return await this.create(newUser);
  }
}
