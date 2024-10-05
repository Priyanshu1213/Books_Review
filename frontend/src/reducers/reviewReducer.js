import {
    REVIEW_LIST_REQUEST,
    REVIEW_LIST_SUCCESS,
    REVIEW_LIST_FAIL,
    REVIEW_CREATE_REQUEST,
    REVIEW_CREATE_SUCCESS,
    REVIEW_CREATE_FAIL,
  } from '../constants/reviewConstants';
  
  // Review list reducer
  export const reviewListReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case REVIEW_LIST_REQUEST:
        return { loading: true, reviews: [] };
      case REVIEW_LIST_SUCCESS:
        return { loading: false, reviews: action.payload };
      case REVIEW_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Review create reducer
  export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case REVIEW_CREATE_REQUEST:
        return { loading: true };
      case REVIEW_CREATE_SUCCESS:
        return { loading: false, success: true };
      case REVIEW_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  