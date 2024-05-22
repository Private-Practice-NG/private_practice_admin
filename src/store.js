import { configureStore} from "@reduxjs/toolkit";
// import authReducer from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import usersSliceReducer from './slices/usersSlice'
import {apiSlice} from './slices/apiSlice'
const store = configureStore({
  reducer: {
    // auth: authReducer,
    dashboard: dashboardReducer,
    users:usersSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  // devTools: true,
});

export default store