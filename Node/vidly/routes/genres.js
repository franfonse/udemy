const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');

const genres = [
    {
        id: 1,
        name: 'Comedy'
    },
    {
        id: 2,
        name: 'Horror'
     },
     {
         id: 3,
         name: 'Drama'
     },
     {
         id: 4,
         name: 'Suspense'
     },
     {
         id: 5,
         name: 'Science Fiction'
     }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.post('/', (req, res) => {
    const result = validateSchema(req.body);
    if (result) {
        res.status(400).send(`Error 400: Bad Request. ${result.details[0].message}`);
    } else {
        const genre = {
            id: genres.length + 1,
            name: req.body.name
        };
        genres.push(genre);
        res.status(200).send(`New genre added: ${genre}`);
    }
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send(`Error 404: Elemento with the id of ${req.params.id} doesn't exist.`);
    } else {
        const result = validateSchema(req.body);
        if (result) {
            res.status(400).send(`Error 400: Bad Request. ${result.details[0].message}`);
        } else {
            genre.name = req.body.name;
            res.status(200).send(`Course updated: ${genre}`);
        }
    }
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) {
        res.status(404).send(`Error 404: Element que the id of ${req.params.id} doesn't exist.`);
    } else {
        res.send(genres.splice(genres.indexOf(genre), 1));
    }
});

function validateSchema(objectParam) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const { error } = schema.validate(objectParam);
    return error;
}

module.exports = router;