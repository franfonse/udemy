const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

router.get('/', (req, res) => {
    res.send(Genre.find().sort('name'));
});

router.post('/', async (req, res) => {
    const result = validateGenre(req.body);
    if (result) return res.status(400).send(result.details[0].message);
    let genre = new Genre({
        name: req.body.name
    });
    genre = await genre.save();
    return genre;
});

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    const {
        error
    } = schema.validate(genre, schema);
    return error;
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.genreRouter = router;
exports.validate = validateGenre;