import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store/Store';

import "./index.css";  
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 

import "./assets/css/bootstrap.min.css";   
import "./assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <Provider store={store}>
    <App />
  </Provider>

);


