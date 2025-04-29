const express = require('express');
const app = express();

// Enable and disable with export DEBUG=app:...
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');

const morgan = require('morgan');
const logger = require('./middleware/logger');

const home = require('./routes/home');
const courses = require('./routes/courses');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(logger);

app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded());
app.use('/', home);
app.use('/api/courses', courses);

console.log(app.get('env'));
console.log(process.env);


// Configuration (change enviroment with 'export NODE_ENV=development or production')
console.log('Applicaition name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled...');
    // console.log('Morgan enabled'); Use debug to enable and disable clg of differetnt types, e.g.: startup app or database related logs
}

// Database work...
dbDebugger('Connected to database...');

console.log(process.env.PORT);

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
