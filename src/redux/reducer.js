import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);
      if (isItemExist) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
    },

    incrementFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems.forEach((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }
      });
    },

    decrementFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems.forEach((item) => {
        if (item.id === id && item.quantity > 1) {
          item.quantity -= 1;
        }
      });
    },

    deleteFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    calculateCartTotle: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => {
        sum += i.price * i.quantity;
      });
      state.subTotal = sum;
      sum > 1000 ? state.shipping = 0 : state.shipping = 200;
      state.tax = +(sum*0.18).toFixed();
      state.total = state.subTotal + state.tax + state.shipping;    
      if(state.cartItems.length===0){ 
        state.shipping=0;
        state.total=0;
      }
    },
  }
);
