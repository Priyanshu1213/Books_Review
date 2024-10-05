const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get reviews for a book
// @route   GET /reviews?bookId=:id
// @access  Public
const getReviews = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const reviews = await Review.find({ book: bookId }).populate('user', 'name');

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Submit a new review
// @route   POST /reviews
// @access  Private
const createReview = async (req, res) => {
    const { rating, comment, bookId } = req.body;
    
    try {
        const book = await Book.find({_id:bookId});
    
        if (!book) return res.status(404).json({ message: 'Book not found' });
       
        const review = new Review({
            user: req.user._id,
            book: book[0]._id,
            rating,
            comment,
        });
       
        const savedReview = await review.save();
        
        await Book.findOneAndUpdate({_id:bookId},{
            $set:{reviews:savedReview._id}
        })

        res.status(201).json({savedReview,message: 'Thank you for review.'});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getReviews, createReview };
