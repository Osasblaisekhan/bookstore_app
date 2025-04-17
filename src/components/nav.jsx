import React from 'react';

import './navbar.css';

import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav-container">
    <div className="logo"><h2>Book Store CMS</h2></div>
    <ul>
      <li>
        <Link to="/">Books</Link>
      </li>
      <li>
        <Link to="/category">Categories</Link>
      </li>
    </ul>

  </nav>
);

export default Navbar;
