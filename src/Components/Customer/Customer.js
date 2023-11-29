
import React, { useState } from 'react';
import Drink from '../Drink/Drink';
import { useVendingMachine } from '../Context/VendingMachineContext';
import styles from './Customer.module.css';

function Customer() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const { state, dispatch, updateSalesInformation } = useVendingMachine();

  const handleBuy = (selectedDrink) => {
    if (selectedDrink.quantity === 0) {
      alert('Out of stock.');
    } else if (currentBalance >= selectedDrink.price) {
      setCurrentBalance(currentBalance - selectedDrink.price);

      dispatch({ type: 'BUY_DRINK', payload: selectedDrink });

      updateSalesInformation(selectedDrink.price, selectedDrink.price - selectedDrink.cost, 1);

      alert(`Purchase successful! Change: $${currentBalance.toFixed(2) - selectedDrink.price.toFixed(2)}`);
    } else {
      alert('Insufficient balance to make the purchase.');
    }
  };

  const addMoney = (amount) => {
    setCurrentBalance(currentBalance + amount);
  };

  
  return (
    <div className={styles['customer-panel']}>
      <h2>Customer Panel</h2>
      <div className={styles['customer-info']}>
        <p className={styles['balance-text']}>Your Balance: ${currentBalance.toFixed(2)}</p>
        <div className={styles['button-container']}>
          <button onClick={() => addMoney(0.10)}>Add $0.10</button>
          <button onClick={() => addMoney(0.20)}>Add $0.20</button>
          <button onClick={() => addMoney(0.50)}>Add $0.50</button>
          <button onClick={() => addMoney(1.00)}>Add $1.00</button>
        </div>
      </div>
      <div className={styles['customer-drink-list']}>
        {state.drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onBuy={() => handleBuy(drink)} isCustomerView={true} className={styles['customer-drink-box']} />
        ))}
      </div>
    </div>
  );
}

export default Customer;