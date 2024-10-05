const express = require('express');
const { getReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getReviews)  // Retrieve reviews for a book
  .post(protect, createReview);  // Submit a new review (protected route)

module.exports = router;
