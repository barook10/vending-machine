
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Customer from '../Customer/Customer';
import MachineryControl from '../MachineryControl/MachineryControl';
import Sales from '../Sales/Sales';
import { VendingMachineProvider } from '../Context/VendingMachineContext';

const App = () => {
  return (
    <VendingMachineProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Customer />} />
            <Route path="/MachineryControl" element={<MachineryControl />} />
            <Route path="/sales" element={<Sales />} />
          </Routes>
        </Router>
      </div>
    </VendingMachineProvider>
  );
};

export default App;