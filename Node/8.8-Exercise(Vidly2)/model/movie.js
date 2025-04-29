const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const genre = require('./genre');


const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: genre.genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
}));

router.get('/', (req, res) => {
    return res.send(Movie.find().sort('title'));
});

router.post('/', async(req, res) => {
    const result = validateMovie(req.body);
    if (result) return res.status(400).send(result.details[0].message);
    let movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.boolean(),
        dailyRentalRate: Joi.boolean()
    });
    const { error } = schema.validate(customer, schema);
    return error;
}

exports.Movie = Movie;
exports.movieRouter = router;
exports.valitate = validateMovie;