const express = require('express')
const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development)

const router = express.Router();


//crud
//get /api/cars
router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(error => {
        res.status(500).json({message: 'Cannot retrieve cars'})
    })
});

//get /api/cars/:id
router.get('/:id', (req, res) => {
    db('cars')
    .where({id: req.params.id})
    .first()
    .then(car => {
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({message: 'Car ID provided is invalid'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Cannot retrieve car'})
    })
})

//post /api/cars
router.post('/', validateCar, (req, res) => {
    db('cars')
    .insert(req.body, 'id')
    .then(id => {
        console.log(id)
        res.status(201).json({ newCar: id[0] });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error creating car' });
      });
})

//put /api/cars/:id
router.put('/:id', validateCar, (req, res) => {
    db('cars')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if (count) {
            res.status(200).json({message: 'Car has been updated'})
        } else {
            res.status(404).json({message: 'Car ID provided is invalid'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error updating the car' });
      });
})

//delete /api/cars/:id
router.delete('/:id', (req, res) => {
    db('cars')
    .where({id: req.params.id})
    .del()
    .then(count => {
        if (count) {
            res.status(200).json({message: 'Car has been deleted'})
        } else {
            res.status(404).json({message: 'Car ID provided is invalid'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error deleting the car' });
      });
})

//Middleware
function validateCar(req, res, next) {
    if(!req.body.VIN) {
        res.status(400).json({message: 'VIN is required'})
    } else if (!req.body.make) {
        res.status(400).json({message: 'Make is required'})
    } else if (!req.body.model) {
        res.status(400).json({message: 'Model is required'})
    } else {
        next();
    }
}

module.exports = router;