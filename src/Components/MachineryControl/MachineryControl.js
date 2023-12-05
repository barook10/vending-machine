import React, { useState } from 'react';
import Drink from '../Drink/Drink';
import { Link } from 'react-router-dom';
import { useVendingMachine } from '../Context/VendingMachineContext';
import styles from './MachineryControl.module.css';

function MachineryControl() {
  const hardcodedPassword = 'admin';
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [invalidPasswordAttempt, setInvalidPasswordAttempt] = useState(false);
  const { state, dispatch } = useVendingMachine();
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newDrinkPrice, setNewDrinkPrice] = useState('');
  const [newDrinkQuantity, setNewDrinkQuantity] = useState('');
  const [newDrinkImage, setNewDrinkImage] = useState('');

  const addDrink = () => {
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

  const deleteDrink = (drink) => {
    if (isPasswordCorrect) {
      dispatch({ type: 'DELETE_DRINK', payload: drink });
    }
  };

  const addQuantity = (drink) => {
    if (isPasswordCorrect) {
      dispatch({ type: 'REFILL_DRINK', payload: drink });
    }
  };

  const getNewPrice = (drink, newPrice) => {
    if (isPasswordCorrect) {
      // Check if newPrice is a valid number
      if (!isNaN(newPrice) && newPrice >= 0) {
        // Dispatch the 'CHANGE_PRICE' action with the correct payload
        dispatch({ type: 'CHANGE_PRICE', payload: { drink, newPrice } });
      } else {
        
        alert('Invalid new price:', newPrice);
      }
    }
  };

  return (
    <div className={styles['machinery-control-panel']}>
      <h2>Machinery Control Panel</h2>
      {!isPasswordCorrect ? (
        <div className={styles['input-container']}>
          <p>Enter password to access the Machinery Control panel:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (password === hardcodedPassword) {
                setIsPasswordCorrect(true);
                setInvalidPasswordAttempt(false);
              } else {
                setInvalidPasswordAttempt(true);
              }
            }}
          >
            Submit
          </button>
          {invalidPasswordAttempt && (
            <p className={styles['error-message']}>Invalid password. Please try again.</p>
          )}
        </div>
      ) : (
        <div>
          <Link to="/">
            <button className={styles.btn}>End Simulation</button>
            <button className={styles.btn1}>Lock</button>
          </Link>
          <div className={styles['drink-list']}>
            {state.drinks.map((drink) => (
              <div key={drink.name}>
                <Drink
                  drink={drink}
                  addQuantity={() => addQuantity(drink)}
                  getNewPrice={(newPrice) =>
                    getNewPrice(drink, newPrice)
                  }
                  deleteDrink={() => deleteDrink(drink)}
                />
              </div>
            ))}
          </div>
          <div className={styles['input-container']}>
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
            <button onClick={addDrink}>Add Drink</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MachineryControl;
