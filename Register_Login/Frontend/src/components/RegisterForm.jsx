import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register',data);
      setData({
        name: '',
        username: '',
        email: '',
        password: ''
      });
      setError('');
      if (res.data.success) {
        toast.success('Registration successful!');
      } else {
        toast.error(res.data.message);
      }
      // Handle successful registration (e.g., save token, redirect)
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
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>
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
            type="text"
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

// const App = () => {
//   return (
//     <div>
      
//       <RegisterForm />
//     </div>
//   );
// };

export default RegisterForm;