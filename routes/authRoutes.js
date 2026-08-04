import express from 'express';
import {
  register,
  login,
  signupUser,
 
  logout
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get("/signup",signupUser)


export default router;