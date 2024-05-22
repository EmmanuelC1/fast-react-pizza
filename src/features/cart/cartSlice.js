import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/** Returns Redux ```cart``` state @returns {Array<object>} */
export const getCart = (state) => state.cart.cart;

/** Returns total number of items in the cart @returns {Number} */
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, curItem) => (acc += curItem.quantity), 0);

/** Returns total price of current items in cart. Does NOT include priority price @returns {Number} */
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, curItem) => (acc += curItem.totalPrice), 0);

/** Returns current quantity of a specific item given the item id
 * @param {Number} id The item ID
 * @returns {Number} quantity of item
 */
export const getCurrentQuantityByID = (id) => (state) => {
  const item = state.cart.cart.find((curItem) => curItem.pizzaId === id);
  return item?.quantity ?? 0;
};
