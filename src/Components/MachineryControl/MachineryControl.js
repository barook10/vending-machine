import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MachineryControl.module.css';
import withVendingMachine from '../Context/VendingMachineWrapper';
import DrinkStorage from '../DrinkStorage/DrinkStorage';

class MachineryControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      isPasswordCorrect: false,
      invalidPasswordAttempt: false,
      newDrinkName: '',
      newDrinkPrice: '',
      newDrinkQuantity: '',
      newDrinkImage: '',
    };
  }

  addDrink = () => {
    const { isPasswordCorrect, newDrinkName, newDrinkPrice, newDrinkQuantity, newDrinkImage } = this.state;
    const { dispatch } = this.props.vendingMachineContext;

    if (isPasswordCorrect) {
      const newDrink = {
        name: newDrinkName,
        price: parseFloat(newDrinkPrice),
        quantity: parseInt(newDrinkQuantity),
        image: newDrinkImage,
      };

      dispatch({ type: 'ADD_DRINK', payload: newDrink });

      this.setState({
        newDrinkName: '',
        newDrinkPrice: '',
        newDrinkQuantity: '',
        newDrinkImage: '',
      });
    }
  };

  deleteDrink = (drink) => {
    const { isPasswordCorrect } = this.state;
    const { dispatch } = this.props.vendingMachineContext;

    if (isPasswordCorrect) {
      dispatch({ type: 'DELETE_DRINK', payload: drink });
    }
  };

  addQuantity = (drink) => {
    const { isPasswordCorrect } = this.state;
    const { dispatch } = this.props.vendingMachineContext;

    if (isPasswordCorrect) {
      dispatch({ type: 'REFILL_DRINK', payload: drink });
    }
  };

  getNewPrice = (drink, newPrice) => {
    const { isPasswordCorrect } = this.state;
    const { dispatch } = this.props.vendingMachineContext;

    if (isPasswordCorrect) {
      if (!isNaN(newPrice) && newPrice >= 0) {
        dispatch({ type: 'CHANGE_PRICE', payload: { drink, newPrice } });
      } else {
        alert('Invalid new price:', newPrice);
      }
    }
  };

  render() {
    const {
      password,
      isPasswordCorrect,
      invalidPasswordAttempt,
      newDrinkName,
      newDrinkPrice,
      newDrinkQuantity,
      newDrinkImage,
    } = this.state;
    const { state } = this.props.vendingMachineContext;

    return (
      <div className={styles['machinery-control-panel']}>
        {!isPasswordCorrect ? (
          <div className={styles['input-container']}>
            <p>Enter password to access the Machinery Control panel:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button
              onClick={() => {
                if (password === 'admin') {
                  this.setState({
                    isPasswordCorrect: true,
                    invalidPasswordAttempt: false,
                  });
                } else {
                  this.setState({ invalidPasswordAttempt: true });
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
                  <DrinkStorage
                    drink={drink}
                    addQuantity={() => this.addQuantity(drink)}
                    getNewPrice={(newPrice) => this.getNewPrice(drink, newPrice)}
                    deleteDrink={() => this.deleteDrink(drink)}
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
                onChange={(e) => this.setState({ newDrinkName: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newDrinkPrice}
                onChange={(e) => this.setState({ newDrinkPrice: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newDrinkQuantity}
                onChange={(e) => this.setState({ newDrinkQuantity: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newDrinkImage}
                onChange={(e) => this.setState({ newDrinkImage: e.target.value })}
              />
              <button onClick={this.addDrink}>Add Drink</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withVendingMachine(MachineryControl);
