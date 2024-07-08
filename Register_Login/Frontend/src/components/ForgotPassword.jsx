import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5173/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Forgot Password</h2>
        <div className="forgot-input-container">
          <FaEnvelope size={20}/>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Send Reset Link</button>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
        <a href="/">Login</a>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
