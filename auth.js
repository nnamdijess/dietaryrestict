// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/users');  // Assuming you have a User model for database
const verifyToken = require('./middleware'); // Importing the verifyToken middleware 

const router = express.Router();  // Express router initialization

// Define your routes
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

router.post('/login', async (req, res) => {
  
    const { email, password } = req.body;

    console.log(`Login attempt for email: ${email}`);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});


router.get('/profile',verifyToken,  async (req, res) => {

  try {

      const user = await User.findById(req.userId); // Use the user ID attached to the request object (from the decoded JWT token)
      

      // Check if the user exists in the database
      if (!user) {
        
         res.status(404).json({ message: 'User not found' });
      }
  // Return the user's profile (excluding sensitive info like password)

      const { password, ...userProfile } = user.toObject(); 
      
    // Exclude password

      res.status(200).json({ profile: userProfile });
  } catch (err) {

      res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Export the router to use in server.js
module.exports = router;
