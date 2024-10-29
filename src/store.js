import { configureStore } from '@reduxjs/toolkit'; // Import the configureStore function from Redux Toolkit
import cartReducer from './CartSlice'; // Import the cartReducer from CartSlice.jsx

// Configuring the Redux store
const store = configureStore({
    reducer: {
        cart: cartReducer, // Assign cartReducer to manage the cart slice of the state
    },
});

// Export the configured store
export default store;
