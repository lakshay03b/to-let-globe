import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css';

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
      const res = await axios.post('http://localhost:5000/api/auth/login', data);
      console.log(res.data);
      toast.success('Login successful!');
      setError('');
      // Handle successful login (e.g., save token, redirect)
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response.data.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="login-input-container">
          <i className="fas fa-user"></i>
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
          <i className="fas fa-lock"></i>
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
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
