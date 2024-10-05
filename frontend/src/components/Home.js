import React from 'react';
import BookList from './BookList';
import './styles.css'
// import Navbar from './Navbar';
const Home = () => {
  return (
    <>
  {/* <Navbar/> */}
    <div>

      <h1>Welcome to the Book Review Platform</h1>
      <h2>Featured Books</h2>
      <BookList />
    </div>
    </>
  );
};

export default Home;
