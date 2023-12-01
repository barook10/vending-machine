import React, { createContext, useContext, useReducer, useEffect } from "react";

const VendingMachineContext = createContext();

const initialState = {
  drinks: [],
  sales: 0,
  totalDrinksSold: 0,
  remainingStock: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DRINKS":
      return {
        ...state,
        drinks: action.payload,
      };

    case "ADD_DRINK":
      const newDrink = { ...action.payload, sales: 0, totalSold: 0, cost: 0 };
      return {
        ...state,
        drinks: [...state.drinks, newDrink],
      };

    case "DELETE_DRINK":
      return {
        ...state,
        drinks: state.drinks.filter((drink) => drink.name !== action.payload.name),
      };

    case "BUY_DRINK":
      return {
        ...state,
        drinks: state.drinks.map((drink) =>
          drink.name === action.payload.name
            ? {
                ...drink,
                quantity: drink.quantity - 1,
                sales: drink.sales + drink.price,
                totalSold: drink.totalSold + 1,
              }
            : drink
        ),
      };

    case "UPDATE_STOCK":
      const remainingStock = state.drinks.reduce((total, drink) => total + drink.quantity, 0);
      return { ...state, remainingStock };

    case "REFILL_DRINK":
      return {
        ...state,
        drinks: state.drinks.map((drink) =>
          drink.name === action.payload.name ? { ...drink, quantity: drink.quantity + 1 } : drink
        ),
      };

    case "CHANGE_PRICE":
      return {
        ...state,
        drinks: state.drinks.map((drink) =>
          drink.name === action.payload.drink.name ? { ...drink, price: action.payload.newPrice } : drink
        ),
      };

    case "UPDATE_SALES_INFO":
      return {
        ...state,
        sales: state.sales + action.payload.sales,
        totalDrinksSold: state.totalDrinksSold + action.payload.totalDrinksSold,
      };

    case "RESET_SALES":
      const resetSalesDrinks = state.drinks.map((drink) => ({ ...drink, sales: 0 }));
      return {
        ...state,
        drinks: resetSalesDrinks,
        sales: 0,
        totalDrinksSold: 0,
      };

    case "UPDATE_LOCAL_STORAGE":
      localStorage.setItem("drinks", JSON.stringify(state.drinks));
      localStorage.setItem("sales", state.sales.toFixed(2));
      localStorage.setItem("totalDrinksSold", state.totalDrinksSold.toString());
      return state;

    default:
      return state;
  }
};

const VendingMachineProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateSalesInformation = (sales, totalDrinksSold) => {
    dispatch({
      type: "UPDATE_SALES_INFO",
      payload: { sales, totalDrinksSold },
    });
  };

  useEffect(() => {
    const storedDrinks = JSON.parse(localStorage.getItem("drinks")) || [];
    if (storedDrinks.length > 0) {
      dispatch({ type: "SET_DRINKS", payload: storedDrinks });
    }

    const storedSales = parseFloat(localStorage.getItem("sales")) || 0;
    const storedTotalDrinksSold = parseInt(localStorage.getItem("totalDrinksSold")) || 0;

    if (storedSales > 0 || storedTotalDrinksSold > 0) {
      dispatch({
        type: "UPDATE_SALES_INFO",
        payload: { sales: storedSales, totalDrinksSold: storedTotalDrinksSold },
      });
    }
  }, []);

  useEffect(() => {
    if (state.drinks && state.drinks.length > 0) {
      try {
        localStorage.setItem("drinks", JSON.stringify(state.drinks));
      } catch (error) {
        console.error("Error while saving drinks to local storage:", error);
      }
    }
  }, [state.drinks]);

  useEffect(() => {
    try {
      const remainingStock = state.drinks.reduce(
        (total, drink) => total + drink.quantity,
        0
      );
      dispatch({ type: "UPDATE_STOCK", payload: remainingStock });
    } catch (error) {
      console.error("Error while updating local storage:", error);
    }
  }, [state.drinks]);

  useEffect(() => {
    try {
      localStorage.setItem("drinks", JSON.stringify(state.drinks));
      localStorage.setItem("sales", state.sales.toFixed(2));
      localStorage.setItem("totalDrinksSold", state.totalDrinksSold.toString());
    } catch (error) {
      console.error("Error while updating local storage:", error);
    }
  }, [state]);

  return (
    <VendingMachineContext.Provider
      value={{ state, dispatch, updateSalesInformation }}
    >
      {children}
    </VendingMachineContext.Provider>
  );
};

const useVendingMachine = () => {
  const context = useContext(VendingMachineContext);
  if (!context) {
    throw new Error("useVendingMachine must be used within a VendingMachineProvider");
  }
  return context;
};

export { VendingMachineProvider, useVendingMachine };
