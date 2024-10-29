import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Check if the item is already in the cart
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If not, add the item with the specified quantity
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
    },
    removeItem: (state, action) => {
      // Remove the item by filtering out the item with the specified id
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    updateQuantity: (state, action) => {
      // Find the item and update its quantity
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.quantity;
      }
    },
  },
});

// Exporting actions to be used in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
