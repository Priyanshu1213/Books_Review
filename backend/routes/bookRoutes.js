const express = require('express');
const { getBooks, getBookById, addBook } = require('../controllers/bookController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getBooks) ;// Retrieve all books
router.route('/').post(protect, admin, addBook); // Add a new book (admin only)

router.route('/:id').get(protect,getBookById); // Retrieve a specific book

module.exports = router;
