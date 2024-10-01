import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  },
  reducers: {
    showModal: (state, action) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.onConfirm = action.payload.onConfirm || null;
      state.onCancel = action.payload.onCancel || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = '';
      state.message = '';
      state.onConfirm = null;
      state.onCancel = null;
    }
  }
});

export const { showModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
