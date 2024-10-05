import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  
   
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');  
    }
  }, [userInfo, navigate]);


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
