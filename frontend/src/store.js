import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { bookListReducer, bookDetailsReducer, bookAddReducer } from './reducers/bookReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer';
import { reviewListReducer, reviewCreateReducer } from './reducers/reviewReducer';

// Combine all the reducers
const rootReducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducer,
  bookAdd: bookAddReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  reviewList: reviewListReducer,
  reviewCreate: reviewCreateReducer,
});

// Middleware for handling asynchronous actions
const middleware = [thunk];

// Create the Redux store with reducers, middleware, and DevTools extension
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
