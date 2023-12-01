import React, { useState } from 'react';
import Drink from '../Drink/Drink';
import { useVendingMachine } from '../Context/VendingMachineContext';
import { Link } from 'react-router-dom';
import styles from './Customer.module.css';

function Customer() {
  const [currentBalance, setCurrentBalance] = useState(0);
  const [drinkMessages, setDrinkMessages] = useState({});

  const { state, dispatch, updateSalesInformation } = useVendingMachine();

  const handleBuy = (selectedDrink) => {
    // Clear messages for other drinks
    const newDrinkMessages = { [selectedDrink.name]: '' };
    setDrinkMessages(newDrinkMessages);

    if (selectedDrink.quantity === 0) {
      newDrinkMessages[selectedDrink.name] = 'Out of stock.';
      setDrinkMessages(newDrinkMessages);
    } else if (currentBalance >= selectedDrink.price) {
      setCurrentBalance(currentBalance - selectedDrink.price);

      dispatch({ type: 'BUY_DRINK', payload: selectedDrink });

      updateSalesInformation(selectedDrink.price, selectedDrink.price - selectedDrink.cost, 1);

      newDrinkMessages[selectedDrink.name] = `Purchase successful! Change: RM ${(currentBalance - selectedDrink.price).toFixed(2)}`;
      setDrinkMessages(newDrinkMessages);
    } else {
      newDrinkMessages[selectedDrink.name] = 'Insufficient balance to make the purchase.';
      setDrinkMessages(newDrinkMessages);
    }
  };

  const addDenomination = (amount) => {
    setCurrentBalance(currentBalance + amount);
  };

  return (
    <div className={styles['customer-panel']}>
      <h2>Customer Panel</h2>
      <Link to='/' className={styles['button-container']}>
        <button>End Simulation</button>
      </Link>
      <div className={styles['customer-info']}>
        <p className={styles['balance-text']}>Your Balance: RM {currentBalance.toFixed(2)}</p>
        <div className={styles['button-container']}>
          <button onClick={() => addDenomination(0.10)}>Add RM 0.10</button>
          <button onClick={() => addDenomination(0.20)}>Add RM 0.20</button>
          <button onClick={() => addDenomination(0.50)}>Add RM 0.50</button>
          <button onClick={() => addDenomination(1.00)}>Add RM 1.00</button>
        </div>
      </div>
      <div className={styles['customer-drink-list']}>
        {state.drinks.map((drink) => (
          <div key={drink.name} className={styles['drink-container']}>
            <Drink drink={drink} onBuy={() => handleBuy(drink)} isCustomerView={true} className={styles['customer-drink-box']} />
            {drinkMessages[drink.name] && <p className={styles['message']}>{drinkMessages[drink.name]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customer;
