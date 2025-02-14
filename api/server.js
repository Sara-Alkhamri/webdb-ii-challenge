const express = require('express')
const helmet = require('helmet')

//route goes here
const carsRouter = require('../cars/cars-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carsRouter);

module.exports = server;