import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './nav';

import './App.css';

import Books from './bookList';

import Categories from './bookCategory';

const App = () => (
  <div className="app-container">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Books />} />
        <Route path="/category" element={<Categories />} />
      </Routes>
    </Router>
  </div>
);

export default App;
