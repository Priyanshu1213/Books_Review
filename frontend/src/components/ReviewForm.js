import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../actions/reviewActions';
// import { useParams } from 'react-router-dom';

const ReviewForm = ({bookId}) => {
  // const {id: bookId}= useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview({ rating, comment, bookId }));
    setRating(0);
    setComment('');
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>Rating</label>
          <input
            type='number'
            value={rating}
            min='1'
            max='5'
            onChange={(e) => setRating(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required/>
        </div>
        <button type='submit'>Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
