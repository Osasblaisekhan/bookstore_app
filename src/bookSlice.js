import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ApiKey = 'm4EwBGqXI281WdinvzcP';

export const postData = createAsyncThunk('books/postData', async (data) => {
  try {
    const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${ApiKey}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('unable to post data');
    } else {
      const result = await response.json();

      //   console.log(result);

      return result;
    }
  } catch {
    // throw new Error('unable to post data');
    return [];
    // console.log('unable to post data');
  }
});

export const deleteBooks = createAsyncThunk('books/deleteBooks', async (id) => {
  try {
    const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${ApiKey}/books/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('unable delete post');
    } else {
      return id;
    }
  } catch {
    // throw new Error('unable to post data');
    // console.log('unable to delete post');
    return [];
  }
});

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  try {
    const response = await fetch(`https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/${ApiKey}/books`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Unable to load books');
    } else {
      const res = await response.json();
      // const flatObject = Object.values(res).flat().map((book)=>

      const flatObject = Object.entries(res).flatMap(([id, books]) => books.map((book) => {
        // console.log('the id are', id);
        // console.log(' the books are', book);

        const bookProp = {
          id,
          title: book.title,
          author: book.author,
          category: book.category,
        };
        return bookProp;
      }));
      return flatObject;
    }
  } catch {
    // throw new Error('unable to post data');
    // console.log('unable to load books');
    return [];
  }
});

const initialState = {
  books: [],
  loading: false,
  error: null,

};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...state.books, action.payload];
        state.error = '';
      })

      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
