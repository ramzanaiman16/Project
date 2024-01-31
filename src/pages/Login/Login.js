import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Logo from '../../components/Logo/Logo';
import { login } from '../../pages/services/Apis';
import Spiner from "../../components/Spiner/Spiner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [showspin, setShowSpin] = useState(true);

   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === '') {
        throw new Error('Email is required!');
      } else if (!email.includes('@')) {
        throw new Error('Enter a valid email!');
      } else if (password === '') {
        throw new Error('Password is required!');
      }

      const response = await login({ email, password });

      if (response.status === 200) {
        setEmail('');
        setPassword('');
        localStorage.setItem('user', JSON.stringify(response.data.user));
        const token = response.data.token;

        // Store the token in localStorage
        localStorage.setItem('userToken', token);
        console.log('Token stored:', token);
        toast.success('User LogIn Successfully');
        navigate('/');
      } else if (response.status === 404 && response.data.message === 'user not registered') {
        toast.error('User not registered. Please register first.');
        navigate('/register');
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
        setShowSpin(false);
    }, 1200);
}, []);

  return (
    <>
      { showspin ? <Spiner /> : (
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className='logo-design'>
            {<Logo />}
          </div>
          <h1>LOGIN</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className='remember'>Remember me</label>
          </div>

          <button type="submit">Login</button>

          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </form>
        <ToastContainer />  
      </div>
      )}
    </>
  );
};

export default LoginForm;
