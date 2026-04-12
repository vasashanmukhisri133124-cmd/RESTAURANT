import express from 'express';
import { registerUser, loginUser, getUserProfile, getUsers } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Example of an admin-only route
router.get('/admin-dashboard', protect, authorize('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard!' });
});

// Admin get users route
router.get('/users', protect, authorize('admin'), getUsers);

export default router;
