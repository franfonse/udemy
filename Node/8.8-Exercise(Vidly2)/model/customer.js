const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    },
    phone: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
}));

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async (req, res) => {
    const result = validateCustomer(req.body);
    if (result) return res.status(400).send(result.details[0].message);
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.idGold
    });
    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(25).required(),
        phone: Joi.string().required(),
        idGold: Joi.boolean()
    });
    const { error } = schema.validate(customer, schema);
    return error;
}

exports.Customer = Customer;
exports.customerRouter = router;
exports.validate = validateCustomer;