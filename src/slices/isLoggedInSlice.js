import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}


export const isLoggedInSlice = createSlice({
    name: "isLoggedIn",
    initialState,
    reducers: {
        updateLoggedIn: (state, action) => {
            if(action.payload == 1) {
                state.value = true;
            } else {
                state.value = false;
            };
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateLoggedIn } = isLoggedInSlice.actions;

export default isLoggedInSlice.reducer;