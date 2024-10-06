const Book = require('../models/Book');

// @desc    Get all books with pagination
// @route   GET /books
// @access  Public

const getBooks = async (req, res) => {
    try {
      const pageSize = 4; 
      const page = Number(req.query.pageNumber) || 1;
      const searchTerm = req.query.search || ''; 
  
     
      const query = searchTerm ? { title: { $regex: searchTerm, $options: 'i' } } : {};
  
      const count = await Book.countDocuments(query); 
      const books = await Book.find(query)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      
      const pages = Math.ceil(count / pageSize) || 1; 
      res.json({ books, page, pages });
    } catch (error) {
      console.error('Server Error:', error.message); 
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  




// @desc    Get a specific book
// @route   GET /books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews');
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add a new book (admin only)
// @route   POST /books
// @access  Admin
const addBook = async (req, res) => {
    const { title, author, description, genre, coverImage } = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            description,
            genre,
            coverImage,
        });

        const savedBook = await newBook.save();
        res.status(201).json({savedBook,message: 'Book added successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getBooks, getBookById, addBook };
