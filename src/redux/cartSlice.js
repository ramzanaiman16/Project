import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  customerId: '',
  paymentMethod: null,
  cart: [],
 

};

// Create a slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    addtoCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removefromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    editProduct: (state, action) => {
      const { id, ...updatedProduct } = action.payload;
      state.cart = state.cart.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      );
    },
    resetCart: (state) => {
      state.cart = [];
      state.paymentMethod = null;
      state.customerId = null;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
   
   
    
  },
});

export default cartSlice.reducer;

export const {
  setCustomerId,
  setPaymentMethod,
  addtoCart,
  removefromCart,
  editProduct,
  resetCart,
  setProductDetails


} = cartSlice.actions;


