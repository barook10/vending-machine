// MachineryControl.js

import React, { useState } from 'react';
import Drink from '../Drink/Drink';

import { useVendingMachine } from '../Context/VendingMachineContext';
import './MachineryControl.css'

function MachineryControl() {
  const hardcodedPassword = 'admin';
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const { state, dispatch } = useVendingMachine();
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newDrinkPrice, setNewDrinkPrice] = useState('');
  const [newDrinkQuantity, setNewDrinkQuantity] = useState('');
  const [newDrinkImage, setNewDrinkImage] = useState('');

  const onAddDrink = () => {
    if (isPasswordCorrect) {
      const newDrink = {
        name: newDrinkName,
        price: parseFloat(newDrinkPrice),
        quantity: parseInt(newDrinkQuantity),
        image: newDrinkImage,
      };

      dispatch({ type: 'ADD_DRINK', payload: newDrink });

      setNewDrinkName('');
      setNewDrinkPrice('');
      setNewDrinkQuantity('');
      setNewDrinkImage('');
    }
  };

  const onDeleteDrink = (drink) => {
    if (isPasswordCorrect) {
      dispatch({ type: 'DELETE_DRINK', payload: drink });
    }
  };

  const onRefill = (drink) => {
    if (isPasswordCorrect) {
      dispatch({ type: 'REFILL_DRINK', payload: drink });
    }
  };

  const onChangePrice = (drink, newPrice) => {
    if (isPasswordCorrect) {
        // Check if newPrice is a valid number
  if (!isNaN(newPrice) && newPrice >= 0) {
    // Dispatch the 'CHANGE_PRICE' action with the correct payload
    dispatch({ type: 'CHANGE_PRICE', payload: { drink, newPrice } });
  } else {
    // Handle invalid newPrice (e.g., show an error message)
    console.error('Invalid new price:', newPrice);
  }
    }
  };

  // const onBuyDrink = (selectedDrink) => {
  //   if (isPasswordCorrect) {
  //     dispatch({ type: 'BUY_DRINK', payload: selectedDrink });
  //   }
  // };

  return (
    <div className="machinery-control-panel">
      <h2>MachineryControl Panel</h2>
      {!isPasswordCorrect ? (
        <div className='input-container'>
          <p>Enter password to access the Machinery Control panel:</p>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setIsPasswordCorrect(password === hardcodedPassword)}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <div className="drink-list">
            {state.drinks.map((drink) => (
              <div key={drink.name} >
                <Drink drink={drink} onRefill={() => onRefill(drink)} onChangePrice={(newPrice) => onChangePrice(drink, newPrice)} onDeleteDrink={() => onDeleteDrink(drink)} />
               
              </div>
            ))}
          </div>
          <div className='input-container'>
          <h3>Add New Drink</h3>
          <input
            type="text"
            placeholder="Drink Name"
            value={newDrinkName}
            onChange={(e) => setNewDrinkName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newDrinkPrice}
            onChange={(e) => setNewDrinkPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newDrinkQuantity}
            onChange={(e) => setNewDrinkQuantity(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newDrinkImage}
            onChange={(e) => setNewDrinkImage(e.target.value)}
          />
          <button onClick={onAddDrink}>Add Drink</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MachineryControl;
