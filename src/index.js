import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Environment variables in Create React App should use the REACT_APP_ prefix
// and are loaded automatically by react-scripts; do not import dotenv in client code.

// use env variable in index.html to set the title of the page
window.onload = function() {
  document.getElementById("title").innerHTML=process.env.REACT_APP_STUDIO_NAME;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
