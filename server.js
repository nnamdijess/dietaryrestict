require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./auth'); // Import your routes
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // To parse JSON requests

// MongoDB connection (replace with your actual DB URI)
mongoose
    .connect('mongodb://localhost:27017/dietaryTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));


  app.use(cors({
      origin: 'http://127.0.0.1:5501',  // Allow requests only from this frontend URL
      methods: ['GET', 'POST'],  // Adjust the allowed methods as needed
      credentials: true           // Allow cookies if needed
    }));

    
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
