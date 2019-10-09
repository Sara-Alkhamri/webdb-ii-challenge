const express = require('express')
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(error => {
        res.status(500).json({message: 'Cannot retrieve cars'})
    })
});

module.exports = router;