import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchBooks, deleteBooks } from '../bookSlice';

import BookInput from './bookInput';

import './bookList.css';

const Books = () => {
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    // console.log('book id is yooo ', id);
    dispatch(deleteBooks(id));
  };

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const books = useSelector((state) => state.book.books);
  //   console.log('osas blaise', books);
  const loading = useSelector((state) => state.book.loading);
  //   console.log(loading);
  const error = useSelector((state) => state.book.error);
  //   console.log(error);

  if (loading) {
    return <div>task loading...</div>;
  }
  if (error) {
    return (
      <p>
        This page
        {error}
      </p>
    );
  }

  return (
    <div className="general-content">
      <div className="container">
        <ul className="book-container">
          {books.map((book) => (
            <li key={book.id} className="book-content">

              <div className="content-one">
                <p>{book.category}</p>
                <div className="title">
                  <h2>{book.title}</h2>
                  <p className="blue">{book.author}</p>
                </div>
                <div className="btns">
                  <button type="button">Comments</button>
                  <button onClick={() => handleDeleteBook(book.id)} type="button" className="one">Remove</button>
                  <button type="button">Edit</button>
                </div>
              </div>

              <div className="content-two">
                <div className="track">
                  <div className="tracking" />
                </div>

                <div className="rates">
                  <h2>0%</h2>
                  <p className="status">
                    Completed
                  </p>
                </div>

              </div>
              <div className="line">
                <h2>|</h2>
              </div>

              <div className="content-three">
                <p>Current Chapter</p>
                <h3>Chapter 17</h3>
                <button type="button">Update Progress</button>

              </div>

            </li>
          ))}
        </ul>
      </div>

      <div className="input-book">
        <BookInput />
      </div>
    </div>
  );
};

export default Books;
