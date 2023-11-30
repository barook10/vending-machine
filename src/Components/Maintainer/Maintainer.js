import React, { useState } from 'react';
import { useVendingMachine } from '../Context/VendingMachineContext';
import Drink from '../Drink/Drink';
import { Link } from 'react-router-dom';
import styles from './Maintainer.module.css';

const Sales = () => {
  const hardcodedPassword = 'admin'; // Set your desired password
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const { state, dispatch } = useVendingMachine();

  const resetSales = () => {
    if (isPasswordCorrect) {
      dispatch({ type: 'RESET_SALES' });
    }
  };

  const getDenomination = () => {
    // Sum up sales for all drinks
    return state.drinks.reduce((total, drink) => total + drink.sales, 0);
  };

  return (
    <div className={styles['sales-container']}>
      {!isPasswordCorrect ? (
        <div className={styles['input-container']}>
          <p>Enter password to access the Sales panel:</p>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (password === hardcodedPassword) {
                setIsPasswordCorrect(true);
              }
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div>
          <Link to='/'>
            <button className={styles['collect-cash-button']}>End Simulation</button>
          </Link>
          {/* Display sales stats for each drink */}
          <ul>
            <h3 className={styles['sales-header']}>Drinks Sales Stats:</h3>
            {state.drinks.map((drink) => (
              <div key={drink.name} className={styles['drink-stats']}>
                <Drink drink={drink} image={drink.image} isSalesView={true} />
                {/* Additional sales information for each drink */}
                <div className={styles['sales-info']}>
                  {drink.sales !== undefined && (
                    <p>Total Sales: RM {Number(drink.sales).toFixed(2) || 0}</p>
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
          <button className={styles['collect-cash-button']} onClick={resetSales}>
            Collect all cash
          </button>
          <p>Total Sales: RM {getDenomination().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Sales;