import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import React from 'react';


import App from './App.jsx'

import PageSlider from './Pages/PageSlider.jsx';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <AdminPanel></AdminPanel> */}
    </BrowserRouter> 
  </React.StrictMode>
)
