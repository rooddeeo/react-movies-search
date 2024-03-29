import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/styles.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.querySelector('#root')).render(
  <BrowserRouter basename="/react-movies-search">
    <App />
  </BrowserRouter>
);
