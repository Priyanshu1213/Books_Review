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


  const initialState = {
    books: [], // Ensure this is an array
    loading: false,
    error: null,
};
  
  // Book list reducer to handle state changes for retrieving all books
  export const bookListReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOK_LIST_REQUEST:
        return { loading: true, books: [] };
      case BOOK_LIST_SUCCESS:
        // console.log(action.payload)
        return { loading: false, books: action.payload };
      case BOOK_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Book details reducer to handle state changes for retrieving a single book
  export const bookDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOOK_DETAILS_REQUEST:
        return { ...state, loading: true };
      case BOOK_DETAILS_SUCCESS:
        return { loading: false, book: action.payload };
      case BOOK_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  



  export const bookAddReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_ADD_REQUEST:
        return { loading: true };
      case BOOK_ADD_SUCCESS:
        return { loading: false, success: true, book: action.payload }; // Store the added book in the state
      case BOOK_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };