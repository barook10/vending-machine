// Maintainer.js

import React, { useState } from 'react';
import Drink from '../Drink/Drink';
import Sales from '../Sales/Sales';
import { useVendingMachine } from '../Context/VendingMachineContext';

function Maintainer() {
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
      dispatch({ type: 'CHANGE_PRICE', payload: { drink, newPrice } });
    }
  };

  return (
    <div>
      <h2>Maintainer Panel</h2>
      {!isPasswordCorrect ? (
        <div>
          <p>Enter password to access the maintainer panel:</p>
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
              <div key={drink.name} className="drink-container">
                <Drink drink={drink} onRefill={() => onRefill(drink)} onChangePrice={(newPrice) => onChangePrice(drink, newPrice)} />
                <button onClick={() => onDeleteDrink(drink)}>Delete</button>
              </div>
            ))}
          </div>
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
      )}
      <Sales drinks={state.drinks} />
    </div>
  );
}

export default Maintainer;
