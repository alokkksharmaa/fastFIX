// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';   // ← update import
import App from './App';
import { ShopProvider } from './context/shopContext';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>
);