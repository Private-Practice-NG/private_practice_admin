import { createSlice } from "@reduxjs/toolkit";

//Created the state for the User
const initialState = {
  hospitals: null,
  specialists: null,
  admins: null,
  hospital: null,
  specialist: null,
  admin: null,
  nav: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setNav: (state, action) => {
      state.nav = action.payload;
    },
    setHospitals: (state, action) => {
      state.hospitals = action.payload;
    },
    setSpecialists: (state, action) => {
      state.specialists = action.payload;
    },
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },
    setHospital: (state, action) => {
      state.hospital = action.payload;
    },
    setSpecialist: (state, action) => {
      state.specialist = action.payload;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
  },
});

export const {
  setNav,
  setHospitals,
  setSpecialists,
  setAdmins,
  setHospital,
  setSpecialist,
  setAdmin,
} = usersSlice.actions;

export default usersSlice.reducer;
