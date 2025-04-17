import React from 'react';

import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import Store from './bookStore';

import App from './components/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
