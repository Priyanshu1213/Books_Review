import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
// import { useParams } from 'react-router-dom';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Portal from './portal';
import './styles.css'

const Profile = ({userId}) => {
  // const { id: userId } = useParams(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  const dispatch = useDispatch();

  // Fetch user details from Redux state
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;


  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  const [openPortal,setOpenPortal]=useState(false)
  const togglePortal=()=>{
    setOpenPortal(!openPortal)
  }

  useEffect(() => {
    if (!user || user._id !== userId || successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name || '');
      setEmail(user.email || '');
   
    }
  }, [dispatch, user, userId, successUpdate]);


  const submitHandler = (e) => {
    e.preventDefault();

  
    if (user) {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
    } else {
      console.error('User data is not loaded yet.');
    }
  };

  // if (loading) return <div>Loading...</div>;

  return (
    <>
     
     <div className="user-profile">
    <h3>User Details</h3>
    <h2>{user&&user.name}</h2>
    <h2>{user&&user.email}</h2>
    <button onClick={togglePortal}>Update Profile</button>
  </div>

      {openPortal===true?<Portal close={togglePortal} component={

      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Update Profile</button>
      </form>
      }/>:""}

      
    </>
  );
};

export default Profile;
