import axios from 'axios';
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
} from '../constants/reviewConstants';
import showToast from '../components/Toast/toast';

export const listReviews = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });
    
    const { data } = await axios.get(`http://localhost:5000/api/reviews?bookId=${bookId}`);
    // console.log(data)
    dispatch({ type: REVIEW_LIST_SUCCESS, payload: data });
  } catch (error) {
    // showToast(error.response.data.message, false)
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_CREATE_REQUEST });
    
    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

   const {data}= await axios.post('http://localhost:5000/api/reviews', review, config);
    showToast(data.message, true)
    dispatch({ type: REVIEW_CREATE_SUCCESS });
    
  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
