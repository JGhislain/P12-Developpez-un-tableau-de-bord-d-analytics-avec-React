// Imports essentiels pour React et l'application
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Création et rendu de la racine de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Appel de la fonction reportWebVitals pour mesurer et rapporter les performances de l'application
reportWebVitals();
