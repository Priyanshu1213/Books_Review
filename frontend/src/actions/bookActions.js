import axios from 'axios';
import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_ADD_REQUEST,
  BOOK_ADD_SUCCESS,
  BOOK_ADD_FAIL,
} from '../constants/bookConstants';
import showToast from '../components/Toast/toast';

export const listBooks = (currentPage,searchTerm) => async (dispatch) => {

  try {
    dispatch({ type: BOOK_LIST_REQUEST });

    const { data } = await axios.get(`https://books-review-4nit.onrender.com/api/books`,{
      params: {
        pageNumber: currentPage, 
        search: searchTerm        
      },
    });
    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    // showToast(error.response.data.message, false)
    dispatch({
      type: BOOK_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getBookDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });

    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ensure the admin is authenticated
    },
  };

    const { data } = await axios.get(`https://books-review-4nit.onrender.com/api/books/${id}`,config);
    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: BOOK_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


/////////////////
export const addBook = (bookData) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_ADD_REQUEST });

    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;
  // const isAdmin = userInfoFromStorage ? userInfoFromStorage.isAdmin : null;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Ensure the admin is authenticated
      },
    };

    const { data } = await axios.post('https://books-review-4nit.onrender.com/api/books', bookData, config );
    showToast(data.message, true)
    
    dispatch({ type: BOOK_ADD_SUCCESS, payload: data });
  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: BOOK_ADD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
