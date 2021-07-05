import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
name:"user",
initialState : {
    name : " ",
    email : " ",
    password : " ",
    loggedIn : false,
    idToken:" ",
},
reducers: {
login:(state,action) => {
    state.email = action.payload.email;
    state.name = action.payload.name;
    state.loggedIn = action.payload.loggedIn;
    state.password = action.payload.password;
    state.idToken = action.payload.idToken;
},
logout:(state) => {
  state.email = null;
  state.name = null;
  state.loggedIn = null;
  state.passowrd = null;
  state.idToken = null;
},
},
})

export const {login,logout} = userSlice.actions;
export const selectEmail = (state) => state.user.email;
export const selectName = (state) => state.user.name;
export const selectPassword = (state) => state.user.password;
export const selectLoggedIn = (state) => state.user.loggedIn;
export const selectIdToken = (state)=>state.user.idToken;
//export const userReducer = userSlice.reducer;
export default userSlice.reducer;
