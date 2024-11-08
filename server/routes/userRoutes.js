import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import FormData from '../models/formData.js';
//import { filterUsername } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/register', async (req, res) => {



  try {
    const { email, password } = await req.body;

    const existingUser = await User.findOne({ email }); // Changed variable name to existingUser
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Internal server error' });
  }
});

// User Login

router.post('/login', async (req, res) => {
  try {
    const { email, password } = await req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'secret_key', {
      expiresIn: '1h',
    });

    res.json({ token, email });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Internal server error' });
  }
});


router.post('/form-data', async (req, res) => {
  try {
      // Extract form data from the request body
      const formData = req.body;

      if (formData) {
          // Create a new instance of your Mongoose model with the form data
          const newFormData = new FormData(formData);
          
          // Save the form data to the database
          await newFormData.save();
          
          // Respond with success
          res.json({ success: "true" });
      } else {
          res.status(400).json({ message: 'No form data provided' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



export default router;

