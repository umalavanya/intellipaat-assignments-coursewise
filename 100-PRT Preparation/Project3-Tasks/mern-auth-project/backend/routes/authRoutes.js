import express from 'express';
import {
  register,
  login,
  getProfile,
  addTask,
  toggleTask,
  deleteTask,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.post('/tasks', authenticate, addTask);
router.put('/tasks/:taskId', authenticate, toggleTask);
router.delete('/tasks/:taskId', authenticate, deleteTask);

export default router;
