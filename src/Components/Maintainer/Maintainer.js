import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Maintainer.module.css';
import CoinStorage from '../CoinStorage/CoinStorage';
import withVendingMachine from '../Context/VendingMachineWrapper';
import DrinkStorage from '../DrinkStorage/DrinkStorage';

class Maintainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordCorrect: false,
    };
  }

  dispenseCash = () => {
    const { isPasswordCorrect } = this.state;
    const { dispatch } = this.props.vendingMachineContext;

    if (isPasswordCorrect) {
      dispatch({ type: 'RESET_SALES' });
    }
  };

  getDenomination = () => {
    const { state } = this.props.vendingMachineContext;
    return state.drinks.reduce((total, drink) => total + drink.sales, 0);
  };

  render() {
    const { password, isPasswordCorrect } = this.state;
    const { state } = this.props.vendingMachineContext;

    return (
      <div className={styles['sales-container']}>
        {!isPasswordCorrect ? (
          <div className={styles['input-container']}>
            <p>Enter password to access the Sales panel:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button
              onClick={() => {
                if (password === 'admin') {
                  this.setState({ isPasswordCorrect: true });
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
            <table className={styles['sales-table']}>
              <thead>
                <tr>
                  <th>Drink Name</th>
                  <th>Total Sales</th>
                  <th>Total Drinks Sold</th>
                  <th>Remaining Stock</th>
                </tr>
              </thead>
              <tbody>
                {state.drinks.map((drink) => (
                  <tr key={drink.name} className={styles['drink-stats']}>
                    <td>
                      <DrinkStorage drink={drink} image={drink.image} isSalesView={true} />
                    </td>
                    {/* Additional sales information for each drink */}
                    <td>
                      {drink.sales !== undefined && (
                        <p>Total Sales: RM {Number(drink.sales).toFixed(2) || 0}</p>
                      )}
                    </td>
                    <td>
                      {drink.totalSold !== undefined && (
                        <p>Total Drinks Sold: {drink.totalSold}</p>
                      )}
                    </td>
                    <td>
                      {drink.quantity !== undefined && (
                        <p>Remaining Stock: {drink.quantity}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <CoinStorage />
            {/* Button to Collect all cash */}
            <button className={styles['collect-cash-button']} onClick={this.dispenseCash}>
              Collect all cash
            </button>
            <p>Total Sales: RM {this.getDenomination().toFixed(2)}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withVendingMachine(Maintainer);
