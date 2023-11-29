
import React from 'react';
import { useVendingMachine } from '../Context/VendingMachineContext';
import Drink from '../Drink/Drink';
import './Sales.css'; 

const Sales = () => {
  const { state, dispatch } = useVendingMachine();

  const resetSales = () => {
    dispatch({ type: 'RESET_SALES' });
  };

  const calculateTotalSales = () => {
    // Sum up sales for all drinks
    return state.drinks.reduce((total, drink) => total + drink.sales, 0);
  };

  return (
    <div className="sales-container">
      {/* Display sales stats for each drink */}
      <h3 className="sales-header">Drinks Sales Stats:</h3>
      <ul>
        {state.drinks.map((drink) => (
          <div key={drink.name} className="drink-stats">
            <Drink drink={drink} image={drink.image} isSalesView={true} />
            {/* Additional sales information for each drink */}
            <div className="sales-info">
              {drink.sales !== undefined && (
                <p>Total Sales: ${Number(drink.sales).toFixed(2) || 0}</p>
              )}
              {drink.profit !== undefined && (
                <p>Total Profit: ${Number(drink.profit).toFixed(2) || 0}</p>
              )}

              {drink.totalSold !== undefined && (
                <p>Total Drinks Sold: {drink.totalSold}</p>
              )}
              {drink.quantity !== undefined && (
                <p>Remaining Stock: {drink.quantity}</p>
              )}
            </div>
          </div>
        ))}
      </ul>

      {/* Button to Collect all cash  */}
      <button className="collect-cash-button" onClick={resetSales}>
        Collect all cash
      </button>
      <p>Total Sales: ${calculateTotalSales().toFixed(2)}</p>
    </div>
  );
};

export default Sales;
