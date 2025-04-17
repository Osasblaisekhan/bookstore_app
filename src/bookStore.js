import { configureStore } from '@reduxjs/toolkit';

import bookSlice from './bookSlice';

const Store = configureStore({
  reducer: {
    book: bookSlice,

  },
});

export default Store;
