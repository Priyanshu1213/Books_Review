
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks } from '../actions/bookActions';
import { Link } from 'react-router-dom';
import './styles.css';  // Import the CSS file
import Portal from './portal';
import AddBook from './Addbook';
const BookList = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  

  const [openPortal,setOpenPortal]=useState(false)
  const togglePortal=()=>{
    setOpenPortal(!openPortal)
  }
  const bookList = useSelector((state) => state.bookList);
  const { books, loading  } = bookList;
  
  const totalPages = books ? books.pages : 1; 
  const books1 = books ? books.books : []; 


  useEffect(() => {
    dispatch(listBooks(currentPage));
  }, [dispatch,openPortal,currentPage]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    
  };

  if (loading) {
    return <div style={{textAlign:"center"}}>Loading...</div>;
  }

  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
 
 
  return (
    <>
    <div className="book-list-container">
      {/* Add Book Button */}
      {userInfoFromStorage&& userInfoFromStorage.isAdmin?  <button onClick={togglePortal}>Add Book</button>:""}
    
      {openPortal?<Portal close={togglePortal} component={<AddBook/>}/>:""}

      {/* Books Grid */}
      <div className="book-list-grid">
        {Array.isArray(books1) && books1.length > 0 ? (
          books1.map((book) => (
            <div key={book._id} className="book-card">
              <h2>{book.title}</h2>
              <h4>by {book.author}</h4>
              <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg" alt={book.title} />
              <p>{book.description}</p>
              <Link to={`/books/${book._id}`}>Details</Link>
            </div>
          ))
        ) : (
          <div style={{marginBottom:"20px"}}>No books available</div>
        )}
      </div>
    </div>

    <div className="paging">
 
  <button 
    onClick={() => handlePageChange(currentPage - 1)} 
    disabled={currentPage === 1} 
  >
    &laquo; Previous
  </button>


  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => handlePageChange(index + 1)}
      className={index + 1 === currentPage ? 'active' : ''}
    >
      {index + 1}
    </button>
  ))}

 
  <button 
    onClick={() => handlePageChange(currentPage + 1)} 
    disabled={currentPage === totalPages} 
  >
    Next &raquo;
  </button>
</div>


    </>
  );
};

export default BookList;
