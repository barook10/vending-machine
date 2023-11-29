
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const VendingMachineContext = createContext();

const initialState = {
  drinks: [],
  sales: 0,
  profit: 0,
  totalDrinksSold: 0,
  remainingStock: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DRINKS':
      return {
        ...state,
        drinks: action.payload,
      };

      case 'ADD_DRINK':
        const newDrink = {
          ...action.payload,
          sales: 0,
          profit: 0,
          totalSold: 0, 
          cost: 0,
        };
        const updatedDrinksAdd = [...state.drinks, newDrink];
        localStorage.setItem('drinks', JSON.stringify(updatedDrinksAdd));
        return {
          ...state,
          drinks: updatedDrinksAdd,
        };

    case 'DELETE_DRINK':
      const updatedDrinksDelete = state.drinks.filter((drink) => drink.name !== action.payload.name);
      return {
        ...state,
        drinks: updatedDrinksDelete,
      };
   
      case 'BUY_DRINK':
        const updatedDrinksBuy = state.drinks.map((drink) =>
          drink.name === action.payload.name
            ? {
                ...drink,
                quantity: drink.quantity - 1,
                sales: drink.sales + drink.price,
                profit: drink.profit + (drink.price - drink.cost),
                totalSold: drink.totalSold + 1,
              }
            : drink
        );
        return {
          ...state,
          drinks: updatedDrinksBuy,
        };
      
    case 'UPDATE_STOCK':
      return { ...state, remainingStock: action.payload };

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
        drink.name === action.payload.drink.name ? { ...drink, price: action.payload.newPrice } : drink
      );
      return {
        ...state,
        drinks: updatedDrinksChangePrice,
      };

      case 'UPDATE_SALES_INFO':
        return {
          ...state,
          sales: state.sales + action.payload.sales,
          profit: state.profit + action.payload.profit,
          totalDrinksSold: state.totalDrinksSold + action.payload.totalDrinksSold,
        };
        case 'RESET_SALES':
          const resetSalesDrinks = state.drinks.map((drink) => ({
            ...drink,
            sales: 0,
            profit: 0,
          }));
          const resetState = {
            ...state,
            drinks: resetSalesDrinks,
            sales: 0,
            profit: 0,
            totalDrinksSold: 0,
          };
    
          // Update local storage
          try {
            localStorage.setItem('drinks', JSON.stringify(resetState.drinks));
            localStorage.setItem('sales', resetState.sales.toFixed(2));
            localStorage.setItem('profit', resetState.profit.toFixed(2));
            localStorage.setItem('totalDrinksSold', resetState.totalDrinksSold.toString());
          } catch (error) {
            console.error('Error while updating local storage:', error);
          }
    
          return resetState;
        
        case 'UPDATE_LOCAL_STORAGE':
          try {
            localStorage.setItem('drinks', JSON.stringify(state.drinks));
            localStorage.setItem('sales', state.sales.toFixed(2));
            localStorage.setItem('profit', state.profit.toFixed(2));
            localStorage.setItem('totalDrinksSold', state.totalDrinksSold.toString());
          } catch (error) {
            console.error('Error while updating local storage:', error);
          }
          return state;

    default:
      return state;
  }
};


const VendingMachineProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSalesInformation = (sales, profit, totalDrinksSold) => {
    dispatch({
      type: 'UPDATE_SALES_INFO',
      payload: { sales, profit, totalDrinksSold },
    });

    try {
      localStorage.setItem('drinks', JSON.stringify(state.drinks));
      localStorage.setItem('sales', state.sales.toFixed(2));
      localStorage.setItem('profit', state.profit.toFixed(2));
      localStorage.setItem('totalDrinksSold', state.totalDrinksSold.toString());
    } catch (error) {
      console.error('Error while updating local storage:', error);
    }
  };

  useEffect(() => {
    try {
      const storedDrinks = JSON.parse(localStorage.getItem('drinks')) || [];
      if (storedDrinks.length > 0) {
        dispatch({ type: 'SET_DRINKS', payload: storedDrinks });
      }

      const storedSales = parseFloat(localStorage.getItem('sales')) || 0;
      const storedProfit = parseFloat(localStorage.getItem('profit')) || 0;
      const storedTotalDrinksSold = parseInt(localStorage.getItem('totalDrinksSold')) || 0;

      if (storedSales > 0 || storedProfit > 0 || storedTotalDrinksSold > 0) {
        dispatch({
          type: 'UPDATE_SALES_INFO',
          payload: { sales: storedSales, profit: storedProfit, totalDrinksSold: storedTotalDrinksSold },
        });
      }
    } catch (error) {
      console.error('Error while retrieving data from local storage:', error);
    }
  }, []);
  useEffect(() => {
    if (state.drinks && state.drinks.length > 0) {
      try {
        localStorage.setItem('drinks', JSON.stringify(state.drinks));
      } catch (error) {
        console.error('Error while saving drinks to local storage:', error);
      }
    }
  }, [state.drinks]);

  useEffect(() => {
    try {
      const remainingStock = state.drinks.reduce((total, drink) => total + drink.quantity, 0);
      dispatch({ type: 'UPDATE_STOCK', payload: remainingStock });

     
    } catch (error) {
      console.error('Error while updating local storage:', error);
    }
  }, [state]);

  return (
    <VendingMachineContext.Provider value={{ state, dispatch, updateSalesInformation }}>
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

