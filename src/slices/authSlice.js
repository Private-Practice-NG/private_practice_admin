import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    }
  }
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;
