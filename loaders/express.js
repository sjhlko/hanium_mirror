import route from '../api/index.js';
import config from '../config/index.js';
import express from 'express';

export default async app => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  try {
    app.use(config.api.prefix, route());
    console.log('loading router success!');
  } catch (error) {
    console.error('loading router fail!', error);
  }
};
