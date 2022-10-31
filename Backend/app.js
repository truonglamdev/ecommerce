const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const errorMiddleware = require('./middleware/error');
const app = express();
const cookieParser = require('cookie-parser');

dotenv.config({ path: 'config/config.env' });
app.use(express.json());
app.use(cookieParser());
app.use(cors());
connectDB();
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
