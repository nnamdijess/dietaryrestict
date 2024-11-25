require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./auth'); // Import your routes

const app = express();
app.use(bodyParser.json()); // To parse JSON requests

// MongoDB connection (replace with your actual DB URI)
mongoose
    .connect('mongodb://localhost:27017/dietaryTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// Use the auth routes without any prefix
app.use('/', authRoutes); // Routes accessible directly at `/profile`

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next(); // Pass to next handler
});


// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
