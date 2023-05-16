import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}


export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState,
    reducers: {
        updateLoggedIn: (state, action) => {
            state.value = action.payload;
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;