
const express = require('express');
const app = express();

app.use(express.json());

const feedbackRoute = require('./routes/feedbackRoute');

app.use('/api/feedback', feedbackRoute);

module.exports = app;
