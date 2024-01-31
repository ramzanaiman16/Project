// components/Navbar/Navbar.js
import React, { useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import "../Navbar/navbar.css";
import { useSelector } from 'react-redux';
import Chat from '../Websokets/Chat';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const cartItems = useSelector(state => state.cart.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const auth = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const userRole = auth ? JSON.parse(auth).role : null;
  const userId = auth ? JSON.parse(auth).userId : null;

  console.log('Rendering Navbar. User Role:', userRole);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear('user');
      navigate('/login');
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'fixed' : ''}`}>
        <nav className={`navbar navbar-expand-lg ${isScrolled ? 'fixed' : ''}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <Logo />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav fw-bold me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Shop
                  </Link>
                </li>
                {/* {userRole === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-dashboard">
                      Admin Dashboard
                    </Link>
                  </li>
                )} */}
              </ul>

              <form className="link-form">
                {userRole === 'admin' && (
                  <Link to="/upload" className="header__button" type="submit">
                    Upload
                  </Link>
                 )} 

                {auth ? (
                  <>
                    {userRole === 'customer' ? (
                      <Link to="/" className="header__button header__user-type">Customer</Link>
                    ) : (
                      <Link to="/admin-dashboard" className="header__button header__user-type">Admin</Link>
                    )}

                    {/* Use Link to navigate to the /chat route */}
                    <Link to="/chatConnection" className="header__button ">
                      {showChat ? 'Hide Chat' : 'Show Chat'}
                    </Link>
                    <button className="header__button" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="header__button" type="submit">
                    LOGIN
                  </Link>
                )}

                <Link to="/cart" className="header__button" type="submit">
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </header>

      {/* Render the Chat component conditionally */}
      {showChat && <Chat userId={userId} role={userRole} />}
    </>
  );
};

export default Navbar;
