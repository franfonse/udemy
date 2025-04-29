const express = require('express');
const app = express();

const home = require('./routes/home');
const genres = require('./routes/genres');

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);


app.listen(3000, () => console.log('Listening on port 3000...'));
