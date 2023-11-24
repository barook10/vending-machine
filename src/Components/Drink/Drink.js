import React from 'react';

const Drink = ({ drink, onBuy, onRefill, onChangePrice, isCustomerView }) => {
  const { name, price, quantity, image } = drink;

  return (
    <div className="drink-container">
      <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />
      <h3>{name}</h3>
      <p>Price: ${price.toFixed(2)}</p>
      <p>Quantity: {quantity}</p>

      {isCustomerView ? (
        <button onClick={onBuy}>Buy</button>
      ) : (
        <div>
          <button onClick={() => onRefill(drink)}>Refill</button>
          <input
            type="number"
            placeholder="New Price"
            onChange={(e) => onChangePrice(drink, parseFloat(e.target.value))}
          />
        </div>
      )}
    </div>
  );
};

export default Drink;
