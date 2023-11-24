import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import { VendingMachineProvider } from './Components/Context/VendingMachineContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <VendingMachineProvider>
      <App />
    </VendingMachineProvider>
    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
