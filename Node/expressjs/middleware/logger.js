function log(req, res, next) {
    console.log('Hello world! From my own custom middleware.');
    next();
}

module.exports = log;
