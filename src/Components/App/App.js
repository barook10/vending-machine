// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Customer from '../Customer/Customer';
import Maintainer from '../Maintainer/Maintainer';
import Sales from '../Sales/Sales';
import { VendingMachineProvider } from '../Context/VendingMachineContext';

const App = () => {
  return (
    <VendingMachineProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="/maintainer" element={<Maintainer />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </Router>
      </div>
    </VendingMachineProvider>
  );
};

export default App;