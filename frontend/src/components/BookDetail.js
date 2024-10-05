
import Portal from './portal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails } from '../actions/bookActions';
import { listReviews } from '../actions/reviewActions';
import {  useParams } from 'react-router-dom';
import './styles.css'; 
import ReviewForm from './ReviewForm';


const BookDetail = () => {
  const dispatch = useDispatch();
  const { id: bookId } = useParams();

  const bookDetails = useSelector((state) => state.bookDetails);
  const { book } = bookDetails;

  const reviewList = useSelector((state) => state.reviewList);
  const { reviews } = reviewList;

  const [openPortal,setOpenPortal]=useState(false)
const togglePortal=()=>{
  setOpenPortal(!openPortal)
}

  useEffect(() => {
    dispatch(getBookDetails(bookId));
    dispatch(listReviews(bookId));
  }, [dispatch, bookId,openPortal]);


  return (
    <div className="book-detail-container">
     
      {book ? (
        <>

    <div className='book-detail-left'>
      <div className='book-detail-left_1'>
      <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg" alt={book.title} className="book-detail-image" />
      <h4 className="book-detail-genre">Genre: {book.genre}</h4>
      </div>
      <div className='book-detail-left_2'>
      
          <h1 className="book-detail-title">{book.title}</h1>
          <h3 className="book-detail-author">by {book.author}</h3>
          
          <p className="book-detail-description">{book.description}</p>

      </div>
          
          
   </div>
   <div className='book-detail-right'>
          <h2>Reviews</h2>
          {/* <Link to={`/review/${bookId}`} className="review-button">Give Review</Link> */}
        
          {openPortal===true?<Portal close={togglePortal} component={<ReviewForm bookId={bookId}/>}/>:""}
          <div className="reviews-container">
            {reviews &&
              reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <strong>{review.user.name}</strong>
                  <p>Rating: <span>{review.rating}</span></p>
                  <p>{review.comment}</p>
                </div>
              ))}
          </div>
          <button className="review-button" onClick={togglePortal}> Give Review</button>
        </div>
        </>
      
      ) : (
        <h2>please Login for details</h2>
      )}
    </div>
  );
};

export default BookDetail;
