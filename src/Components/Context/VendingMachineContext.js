// VendingMachineContext.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';

const VendingMachineContext = createContext();

const initialState = {
  drinks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DRINKS':
      return {
        ...state,
        drinks: action.payload,
      };
    case 'ADD_DRINK':
      const updatedDrinksAdd = [...state.drinks, action.payload];
      localStorage.setItem('drinks', JSON.stringify(updatedDrinksAdd));
      return {
        ...state,
        drinks: updatedDrinksAdd,
      };
    // Add other cases as needed
    // Inside your reducer function
case 'DELETE_DRINK':
  const updatedDrinksDelete = state.drinks.filter((drink) => drink.name !== action.payload.name);
  return {
    ...state,
    drinks: updatedDrinksDelete,
  };
 
  case 'BUY_DRINK':
  const updatedDrinksBuy = state.drinks.map((drink) =>
    drink.name === action.payload.name ? { ...drink, quantity: drink.quantity - 1 } : drink
  );
  return {
    ...state,
    drinks: updatedDrinksBuy,
  };



case 'REFILL_DRINK':
  const updatedDrinksRefill = state.drinks.map((drink) =>
    drink.name === action.payload.name ? { ...drink, quantity: drink.quantity + 1 } : drink
  );
  return {
    ...state,
    drinks: updatedDrinksRefill,
};

case 'CHANGE_PRICE':
  const updatedDrinksChangePrice = state.drinks.map((drink) =>
    drink.name === action.payload.drink.name
      ? { ...drink, price: action.payload.newPrice }
      : drink
  );
  return {
    ...state,
    drinks: updatedDrinksChangePrice,
};


    default:
      return state;
  }
};

const VendingMachineProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem('drinks'));
    console.log(storedDrinks)

    if (storedDrinks) {
      dispatch({ type: 'SET_DRINKS', payload: storedDrinks });
    }
  }, []);

  return (
    <VendingMachineContext.Provider value={{ state, dispatch }}>
      {children}
    </VendingMachineContext.Provider>
  );
};

const useVendingMachine = () => {
  const context = useContext(VendingMachineContext);
  if (!context) {
    throw new Error('useVendingMachine must be used within a VendingMachineProvider');
  }
  return context;
};

export { VendingMachineProvider, useVendingMachine };
