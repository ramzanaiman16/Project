// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: localStorage.getItem('userToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem('userToken', action.payload);
    },
  },
});

export const { setUserToken } = authSlice.actions;

export default authSlice.reducer;
