import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
  //port number
  port: parseInt(process.env.PORT, 10),

  //DB
  databaseURL: process.env.SQL_URI,

  //Key
  arriveTimeKey: process.env.ARRIVE_TIME_KEY,
  rideAlightKey: process.env.RIDE_ALIGHT_KEY,

  //default api
  api: {
    prefix: '/api',
  },
};
