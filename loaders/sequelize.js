import sequelize from '../models/index.js';
import initModels from '../models/init-models.js';

export default async () => {
  try {
    // SQL DB 연결
    await sequelize.sync({ force: false });
    initModels(sequelize);
    console.log('Connecting database success!');
  } catch (error) {
    console.error('Connecting database fail!', error);
  }
};
