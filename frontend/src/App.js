import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
// import Profile from './components/Profile';
// import ReviewForm from './components/ReviewForm';
import Login from './components/Login';
import Register from './components/Register';
// import AddBook from './components/Addbook';
import './App.css'


const App = () => {
  return (

    <>
    
    <Router>
    <Navbar />
  
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path="/addbook"  element={<AddBook />} /> */}
          <Route path='/books' element={<BookList />} />
          <Route path='/books/:id' element={<BookDetail />} />
          {/* <Route path='/profile/:id' element={<Profile />} /> */}
          {/* <Route path='/review/:id' element={<ReviewForm />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
    
    </Router>
    </>

  );
};

export default App;
