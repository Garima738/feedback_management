const express = require('express');
const app = express();

const feedbackRoute = require('./routes/feedbackRoute');

app.use(express.json());
app.use(feedbackRoute);

module.exports = app;
