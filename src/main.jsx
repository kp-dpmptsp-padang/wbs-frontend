import React from 'react';
import ReactDOM from 'react-dom/client';
import 'preline/dist/preline.js';
import './styles/input.css'
import App from './App.jsx'
import AppProviders from './contexts/AppProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);