import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

const RegisterForm = () => {
 
  const [error, setError] = useState('');
  const [data,setData] = useState({
    name: "",
    username:"",
    email:"",
    password:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register',data);
      console.log(res.data);
      setError('');
      // Handle successful registration (e.g., save token, redirect)
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div className="register-input-container">
          <i className="fas fa-user"></i>
          <input
            name='name'
            type="text" 
            placeholder="Name" 
            value={data.name} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <div className="register-input-container">
          <i className="fas fa-user"></i>
          <input 
            name='username'
            type="text" 
            placeholder="Username" 
            value={data.username} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <div className="register-input-container">
          <i className="fas fa-user"></i>
          <input 
            name='email'
            type="text" 
            placeholder="E-mail" 
            value={data.email} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <div className="register-input-container">
          <i className="fas fa-lock"></i>
          <input 
            name='password'
            type="password" 
            placeholder="Password" 
            value={data.password} 
            onChange={onChangeHandler} 
            required
          />
        </div>
        <button type="submit">REGISTER</button>
        {error && <p className="error">{error}</p>}
        <div className="register-link-container">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/">Login</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
