const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config/config.env' });
const connectDB = () => {
    mongoose
        .connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        })
        .then((data) => {
            console.log(`Mongoose connected with server ${data.connection.host}`);
        })
        .catch((error) => {
            console.log(error);
        });
};
module.exports = connectDB;
