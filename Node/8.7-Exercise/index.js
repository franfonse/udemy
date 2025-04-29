const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo-exercises');

const courseSchema = mongoose.model({
    name: String,
    author: String,
    date: Data,
    tags: [String],
    isPublished: Boolean,
    price: Number
});

app.post('', (req, res) => {

});
