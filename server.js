require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moghagarima26_db_user:uoqD2V7UknGLXDLC@clusterone.4qr1yxy.mongodb.net/feedbackDB')
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(3000, () => {
            console.log('Server Started on port 3000');
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error.message);
    });