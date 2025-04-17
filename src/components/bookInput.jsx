import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import { postData } from '../bookSlice';

import './bookinput.css';

const BookInput = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');

  const [title, setTitle] = useState('');

  const [author, setAuthor] = useState('');

  const HandleAddBook = () => {
    const book = {
      item_id: uuidv4(),
      title,
      author,
      category,
    };
    dispatch(postData(book));
    setAuthor('');
    setTitle('');
  };
  return (
    <div className="container-khan">
      <div className="new-book">
        <h2>Add New Book</h2>
      </div>
      <div className="input-container">
        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Book Title" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Book Author" />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <optgroup label="Category">
            <option value="">Select a category</option>
            <option value="Economy">Economy</option>
            <option value="Action">Action</option>
            <option value="Text">Text</option>
            <option value="Fiction">Fiction</option>
          </optgroup>
        </select>

        <button type="button" onClick={() => HandleAddBook()}>Add Book</button>
      </div>
    </div>
  );
};

export default BookInput;
