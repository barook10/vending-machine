import React from 'react';
import { useVendingMachine } from '../Context/VendingMachineContext';
import styles from './CoinStorage.module.css';

const CoinStorage = () => {
  const { state } = useVendingMachine();

  return (
    <div className={styles['coin-storage-container']}>
      <h2>Coin Storage</h2>
      <table className={styles['coin-table']}>
        <thead>
          <tr>
            <th>Coin Value</th>
            <th>Coin Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state.coinStorage.coins).map(([coinValue, coinCount]) => (
            <tr key={coinValue}>
              <td>{`${coinValue} cent`}</td>
              <td>{coinCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoinStorage;
