import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.css'
import { store } from './app/store';
import { Provider } from 'react-redux';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
  <App/>
</Provider>
);
