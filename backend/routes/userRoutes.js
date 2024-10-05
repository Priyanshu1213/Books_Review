const express = require('express');
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/register').post(registerUser); // Register a new user
router.route('/login').post(loginUser); // User login
router
  .route('/:id')
  .get(protect, getUserProfile)  // Retrieve user profile (protected route)
  .put(protect, updateUserProfile);  // Update user profile (protected route)

module.exports = router;
