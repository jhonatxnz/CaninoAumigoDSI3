import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // talvez tirar
  <React.StrictMode> 
    <App />
  </React.StrictMode>
  // talvez tirar
);

