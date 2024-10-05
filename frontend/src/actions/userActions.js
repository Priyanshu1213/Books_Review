import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
 
} from '../constants/userConstants';
import showToast from '../components/Toast/toast';



export const login = (email, password) => async (dispatch) => {

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post('https://books-review-4nit.onrender.com/api/users/login', { email, password }, config);
   
    showToast(data.message, true)


    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');

  showToast("You are logged out", true)
  
  dispatch({ type: USER_LOGOUT });
};

export const register = (name, email, password,admin) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post('https://books-review-4nit.onrender.com/api/users/register', { name, email, password ,admin}, config);

    showToast(data.message, true)

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
 
  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

      
    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const { data } = await axios.get(`https://books-review-4nit.onrender.com/api/users/${id}`, config);
   
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });



    const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ token}`,
      },
    };
   
    const { data } = await axios.put(`https://books-review-4nit.onrender.com/api/users/${user._id}`, user, config);
    showToast(data.message, true)
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));

  } catch (error) {
    showToast(error.response.data.message, false)
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
