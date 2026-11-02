const app = require('./app');
const mongoose = require('mongoose');


mongoose.connect('PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE')
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((error) => {
        console.log('MongoDB Connection Error:', error.message);
    });

app.listen(3000, () => {
    console.log('Server Started on port 3000');
});
