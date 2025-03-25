const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const middleware = require('./utils/middleware');
const noteRoute = require('./routes/noteRoute');
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.send('hello from backend');
});

app.use('/api/tasks', noteRoute);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
