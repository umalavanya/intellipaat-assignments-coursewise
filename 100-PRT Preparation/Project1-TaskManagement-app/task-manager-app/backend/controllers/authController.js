const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  console.log('Registration request received:', req.body); // LOGGING
  
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log('Missing fields:', { name, email, password }); // LOGGING
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    console.log('User exists check:', userExists); // LOGGING
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    console.log('Creating user...'); // LOGGING
    const user = await User.create({ 
      name, 
      email, 
      password 
    });
    console.log('User created:', user); // LOGGING

    if (user) {
      const token = generateToken(user.id);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error DETAILS:', error); // LOGGING
    console.error('Error stack:', error.stack); // LOGGING
    res.status(500).json({ 
      message: error.message,
      stack: error.stack 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  console.log('Login request received:', req.body); // LOGGING
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No'); // LOGGING
    
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user.id);
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error DETAILS:', error); // LOGGING
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };