const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    coverImage: { type: String },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
