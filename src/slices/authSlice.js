import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || null,
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    email: localStorage.getItem('email') || null
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem('accessToken');
    },
    setUserInfo: (state, action) => {
      // Set user information
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      // Clear user information
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setEmail: (state, action) => {
      // Set email
      state.email = action.payload;
      localStorage.setItem('email', action.payload);
    },
    clearEmail: (state) => {
      // Clear email
      state.email = null;
      localStorage.removeItem('email');
    }
  }
});

// Export actions
export const {
  setAccessToken,
  clearAccessToken,
  setUserInfo,
  clearUserInfo,
  setEmail,
  clearEmail
} = authSlice.actions;

export default authSlice.reducer;

export const selectAccessToken = (state) => state.auth.accessToken;

export const selectUserInfo = (state) => state.auth.userInfo;

export const selectEmail = (state) => state.auth.email;

// import { createSlice } from '@reduxjs/toolkit';

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     accessToken: localStorage.getItem('accessToken') || null,
//     userInfo: JSON.parse(localStorage.getItem('userInfo')) || null, // Added userInfo to state
//   },
//   reducers: {
//     setAccessToken: (state, action) => {
//       state.accessToken = action.payload;
//       localStorage.setItem('accessToken', action.payload);
//     },
//     clearAccessToken: (state) => {
//       state.accessToken = null;
//       localStorage.removeItem('accessToken');
//     },
//     setUserInfo: (state, action) => { // New reducer for setting user info
//       state.userInfo = action.payload;
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//     },
//     clearUserInfo: (state) => { // New reducer for clearing user info
//       state.userInfo = null;
//       localStorage.removeItem('userInfo');
//     },
//   }
// });

// export const { setAccessToken, clearAccessToken, setUserInfo, clearUserInfo } = authSlice.actions;

// export default authSlice.reducer;

// // Selector for access token
// export const selectAccessToken = (state) => state.auth.accessToken;

// // Selector for user info
// export const selectUserInfo = (state) => state.auth.userInfo;
