// Sales.js

import React from 'react';

const Sales = ({ drinks }) => {
  const calculateDrinkStatistics = () => {
    if (!drinks || drinks.length === 0) {
      return [];
    }

    return drinks.map((drink) => {
      const totalSales = drink.price * (drink.initialQuantity - drink.quantity);
      const totalQuantitySold = drink.initialQuantity - drink.quantity;
      const remainingQuantity = drink.quantity;

      return {
        name: drink.name,
        totalSales: totalSales.toFixed(2),
        totalQuantitySold,
        remainingQuantity,
      };
    });
  };

  const drinkStatistics = calculateDrinkStatistics();

  return (
    <div>
      <h2>Sales Dashboard</h2>
      <div>
        <p>Drink Statistics:</p>
        {drinkStatistics.map((drinkStat) => (
          <div key={drinkStat.name}>
            <p>{drinkStat.name}</p>
            <p>Total Sales: ${drinkStat.totalSales}</p>
            <p>Total Quantity Sold: {drinkStat.totalQuantitySold}</p>
            <p>Remaining Quantity: {drinkStat.remainingQuantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
