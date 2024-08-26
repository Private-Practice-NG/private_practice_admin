import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import usersSliceReducer from './slices/usersSlice';
import { apiSlice } from './slices/apiSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: usersSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer
  }
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: true,
});

export default store;
