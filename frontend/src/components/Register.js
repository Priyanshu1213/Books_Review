import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password,admin==="admin"?true:false));
    
  };
  const [admin, setAdmin] = useState(''); 

  const handleSelect = (e) => {
    setAdmin(e.target.value); 
    
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');  
    }
  }, [userInfo, navigate]);


return (
    <div>
      <h1>Register</h1>
  
      <form onSubmit={submitHandler}>
        <div>
          <label>Name</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value) } />
        </div>
        <div>
          <label>Email</label>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
    <div className="select-container">
     <select value={admin} onChange={handleSelect} required>
        <option value="">Select</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
     </select>
    </div>

        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default Register;
