import { createSlice } from "@reduxjs/toolkit";

//Created the state for the User
const initialState = {
    dashboardInfo: localStorage.getItem('dashboardInfo') ? JSON.parse(localStorage.getItem('dashboardInfo')) :null
}

const dashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducers:{
        setDashboard:(state, action) =>{
            state.dashboardInfo = action.payload;
            localStorage.setItem('dashboardInfo',JSON.stringify(action.payload))
        },
        removeDashboard:(state, action) =>{
            state.dashboardInfo = null;
            localStorage.removeItem('dashboardInfo')
        }
    }
})


export const {setDashboard, removeDashboard} = dashboardSlice.actions

export default dashboardSlice.reducer;
