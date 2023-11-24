// Customer.js

import React, { useState } from 'react';
import Drink from '../Drink/Drink';
import { useVendingMachine } from '../Context/VendingMachineContext';

function Customer() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const { state, dispatch } = useVendingMachine();

  const handleBuy = (selectedDrink) => {
    if (selectedDrink.quantity === 0) {
      alert('Out of stock.');
    } else if (currentBalance >= selectedDrink.price) {
      setCurrentBalance(currentBalance - selectedDrink.price);
  
      // Dispatch an action to update the quantity of the selected drink
      dispatch({ type: 'BUY_DRINK', payload: selectedDrink });
  
      alert(`Purchase successful! Change: $${currentBalance.toFixed(2)}`);
    } else {
      alert('Insufficient balance to make the purchase.');
    }
  };
  

  const addMoney = (amount) => {
    setCurrentBalance(currentBalance + amount);
  };

  return (
    <div>
      <h2>Customer Panel</h2>
      <div className="customer-info">
        <p>Your Balance: ${currentBalance.toFixed(2)}</p>
        <div>
          <button onClick={() => addMoney(0.10)}>Add $0.10</button>
          <button onClick={() => addMoney(0.20)}>Add $0.20</button>
          <button onClick={() => addMoney(0.50)}>Add $0.50</button>
          <button onClick={() => addMoney(1.00)}>Add $1.00</button>
        </div>
      </div>
      <div className="drink-list">
        {state.drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onBuy={() => handleBuy(drink)} isCustomerView={true} />
        ))}
      </div>
    </div>
  );
}

export default Customer;
