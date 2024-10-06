import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { listBooks } from '../actions/bookActions';
import Drawer from './Drawer';
import Profile from './Profile';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  

  // Retrieve token from localStorage
  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  const token = userInfoFromStorage ? userInfoFromStorage.token : null;
  const id = userInfoFromStorage ? userInfoFromStorage._id: null;
  const name = userInfoFromStorage ? userInfoFromStorage.name : null;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  

  useEffect(() => {
    dispatch(listBooks(1, searchTerm));
    if (successUpdate) {
      console.log("Profile updated");
    }
  }, [successUpdate,userInfo,searchTerm,dispatch]);


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

 
  // const handleSearchButtonClick = () => {
  //   if (searchTerm.trim() !== '') {
  //     dispatch(listBooks(1, searchTerm));
  //   }

  // };


  const handleProfileClick = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };



  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
    <nav>
      <h1>Book Review Platform</h1>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="search"
          placeholder="Search by book title"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {/* <button onClick={handleSearchButtonClick}>Search</button> */}
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        
        
        {token  ? (
          <>
            <li>
            <button onClick={handleProfileClick}>{name}</button>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>


{ token ? (

  <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {/* Pass user ID as a prop if needed */}
        <Profile userId={id} />
      </Drawer>

):("")





}

    </>
  );
};

export default Navbar;
