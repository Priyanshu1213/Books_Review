const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
dotenv.config();

connectDB();


const app = express();
// app.use(cors());

const corsOptions = {
  origin: ["http://localhost:3000","https://book-review-priyanshu.netlify.app"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
