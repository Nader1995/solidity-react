import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
// import Button from './components/button';
import Balance from "./components/balance";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<Button />*/}
      <Balance />
  </React.StrictMode>
);

