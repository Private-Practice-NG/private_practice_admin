import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'active'
};

const specialistSlice = createSlice({
  name: 'specialist',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  }
});

// Export the actions
export const { setCurrentPage } = specialistSlice.actions;

// Export the reducer
export default specialistSlice.reducer;
