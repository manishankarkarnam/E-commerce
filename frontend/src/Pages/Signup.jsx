import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Signup.css';

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { signup } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData.username, formData.email, formData.password);
    
    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('token', result.token);
      navigate('/shop');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className='loginsignup'>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="loginsignup-fields">
          <input
            type="text"
            name="username"
            placeholder='Your Name'
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder='Email Address'
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Continue</button>
        </form>
        <p className="loginsignup-login">
          Already have an account? <span onClick={() => navigate('/login')}>Login here</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;