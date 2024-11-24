// server.js



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./auth');  // Correct import of the auth routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
console.log(authRoutes);  // Should log the router function
app.use('/auth', authRoutes);  // Using the auth routes

// Connect to MongoDB
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/dietaryTracker';
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
