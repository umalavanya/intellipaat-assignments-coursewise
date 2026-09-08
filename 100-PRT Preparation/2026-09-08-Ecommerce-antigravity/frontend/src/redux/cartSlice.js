import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload; // { product: id, name, image, price, qty, countInStock }
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.product !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { product, qty } = action.payload;
      const item = state.cartItems.find((x) => x.product === product);
      if (item) {
        item.qty = qty;
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
