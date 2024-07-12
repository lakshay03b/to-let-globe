import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { FaUser, FaEnvelope, FaLock, FaUserTag, FaPhone } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    contactNo: '',
    role: 'User'  // default role
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', data);
      setData({
        username: '',
        email: '',
        password: '',
        contactNo: '',
        role: 'User'
      });
      setError('');
      if (res.data.success) {
        toast.success('Registration successful!');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      setError(err.response.data.message);
      toast.error(`Registration failed: ${err.response.data.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Register</h2>
          <div className="register-input-container">
            <FaUser size={20} />
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={data.username}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="register-input-container">
            <FaEnvelope size={20} />
            <input
              name="email"
              type="email"
              placeholder="E-mail"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="register-input-container">
            <FaLock size={20} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="register-input-container">
            <FaPhone className="inverted-icon" size={20} />
            <input
              name="contactNo"
              type="text"
              placeholder="Contact No"
              value={data.contactNo}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="register-input-container">
            <FaUserTag size={20} />
            <select
              name="role"
              value={data.role}
              onChange={onChangeHandler}
              required
            >
              <option className='register-option' value="User">User</option>
              <option className='register-option' value="Buyer">Buyer</option>
              <option className='register-option' value="Tenant">Tenant</option>
              <option className='register-option' value="Owner">Owner</option>
              <option className='register-option' value="Admin">Admin</option>
              <option className='register-option' value="Content Creator">Content Creator</option>
            </select>
          </div>
          <button type="submit">REGISTER</button>
          {error && <p className="error">{error}</p>}
          <div className="register-link-container">
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
  