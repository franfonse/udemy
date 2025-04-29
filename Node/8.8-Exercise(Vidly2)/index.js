const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genre = require('./model/genre');
const customer = require('./model/customer');
const movie = require('./model/movie');

app.use('/api/genre', genre.genreRouter);
app.use('/api/customer', customer.customerRouter);
app.use('/api/movie', movie.movieRouter);

app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Working well...');
});

mongoose.connect('mongodb://localhost:27017/vidly2', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Connected to MongoDB...')).catch(() => console.log('Failed to connect to MongoDB'));

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
