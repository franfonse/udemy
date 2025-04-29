const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const rentalSchema = new mongoose.Schema({

});

const Rental = mongoose.model('Rental', rentalSchema);

router.get('/', (req, res) => {
    res.send(Rental.find());
});

router.post('/', (req, res) => {
    const result = validateRental(req.body);
    if (result) return res.status(400).send(result.details[0].message);
    let rental = new Rental({

    });
    rental = rental.save();
    return rental;
});

function validateRental(rental) {
    const schema = Joi.object({

    });
    const { error } = schema.validate(rental, schema);
    return error;
}