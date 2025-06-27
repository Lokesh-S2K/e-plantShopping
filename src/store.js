import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';


const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return { items: [] };
  }
};


const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});


store.subscribe(() => {
  saveCartToLocalStorage(store.getState());
});

export default store;
