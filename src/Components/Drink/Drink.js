
import React, { useState } from 'react';
import styles from './Drink.module.css';

const Drink = ({ drink, onBuy, addQuantity, getNewPrice, deleteDrink, isCustomerView, isSalesView }) => {
  const { name, quantity, image } = drink;

  // State to manage the price
  const [price, setPrice] = useState(drink.price);

  // State to manage the new price input
  const [newPriceInput, setNewPriceInput] = useState('');

  const setNewPrice = (e) => {
    setNewPriceInput(e.target.value);
  };

  const handlePriceSubmit = () => {
    const newPrice = parseFloat(newPriceInput);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      getNewPrice(newPrice);
      setNewPriceInput(''); 
    } else {
      // Handle invalid input (not a valid number)
      alert('Please enter a valid number for the new price.');
    }
  };

  const formattedPrice = typeof price === 'number' && isFinite(price)
    ? `RM ${price.toFixed(2)}`
    : 'Price: N/A';

  return (
    <div  className={styles['drink-box']}>
      <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />
      <h3>{name}</h3>
      <p>{formattedPrice}</p>

      {isSalesView ? null : (<p>Quantity: {quantity}</p> )}

      {isCustomerView ? (
        <button  onClick={onBuy}>Buy</button>
      ) : (
        <div>
          {isSalesView ? null : (
            <button onClick={() => addQuantity(drink)}>Refill</button>
          )}
          {isSalesView ? null : (
            <div>
              <input  className={styles['drink-input']}
                type="number"
                placeholder="New Price"
                value={newPriceInput}
                onChange={setNewPrice}
              />
              <button onClick={handlePriceSubmit}>Change Price</button>
              <br></br>
              <br></br>
              <button onClick={deleteDrink}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Drink;
