import React, { Component } from 'react';
import styles from './Drink.module.css';

class Drink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.drink.price,
      newPriceInput: '',
    };
  }

  setNewPrice = (e) => {
    this.setState({ newPriceInput: e.target.value });
  };

  handlePriceSubmit = () => {
    const newPrice = parseFloat(this.state.newPriceInput);
    if (!isNaN(newPrice)) {
      this.setState({ price: newPrice, newPriceInput: '' });
      this.props.getNewPrice(newPrice);
    } else {
      alert('Please enter a valid number for the new price.');
    }
  };

  render() {
    const { name, quantity, image } = this.props.drink;
    const { price, newPriceInput } = this.state;
    const { onBuy, addQuantity, deleteDrink, isCustomerView, isSalesView } = this.props;

    const formattedPrice =
      typeof price === 'number' && isFinite(price) ? `RM ${price.toFixed(2)}` : 'Price: N/A';

    return (
      <div className={styles['drink-box']}>
        <img src={image} alt={name} style={{ width: '100px', height: '100px' }} />
        <h3>{name}</h3>
        <p>{formattedPrice}</p>

        {isSalesView ? null : <p>Quantity: {quantity}</p>}

        {isCustomerView ? (
          <button onClick={onBuy}>Buy</button>
        ) : (
          <div>
            {isSalesView ? null : <button onClick={() => addQuantity(this.props.drink)}>Refill</button>}
            {isSalesView ? null : (
              <div>
                <input
                  className={styles['drink-input']}
                  type="number"
                  placeholder="New Price"
                  value={newPriceInput}
                  onChange={this.setNewPrice}
                />
                <button onClick={this.handlePriceSubmit}>Change Price</button>
                <br />
                <br />
                <button onClick={() => deleteDrink(this.props.drink)}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Drink;
