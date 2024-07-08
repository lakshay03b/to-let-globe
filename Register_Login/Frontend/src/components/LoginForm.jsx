import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa';

const LoginForm = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState('');

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api', data);
      console.log(res.data);
      if(res.data.success){
        toast.success('Login successful!');
      }
      else{
        toast.error(res.data.message);
      }
      setError(''); 
      setData({
        username: "",
        password: ""
      })

    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message || 'Login failed!');
    }
  };

  return (
    <div>
      <ToastContainer />
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="login-input-container">
          <FaUser size={20} />
          <input 
            type="text" 
            name='username'
            placeholder="Username" 
            value={data.username} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <div className="login-input-container">
          <FaLock size={20}/>
          <input 
            type="password" 
            name='password'
            placeholder="Password" 
            value={data.password} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <button type="submit">LOGIN</button>
        {error && <p className="error">{error}</p>}
        <div className="login-link-container">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/register">Register</a>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
