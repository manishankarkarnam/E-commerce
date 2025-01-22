import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './CSS/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { login } = useContext(ShopContext);
  const [formData, setFormData] = useState({
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
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('token', result.token);
      navigate('/shop');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className='login-page'>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="login-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-fields">
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
          <button type="submit">Login</button>
        </form>
        <p className="login-redirect">
          Don't have an account? <span onClick={() => navigate('/signup')}>SignUp here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;