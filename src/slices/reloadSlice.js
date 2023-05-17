import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
}


export const reloadSlice = createSlice({
    name: "reload",
    initialState,
    reducers: {
        updateReload: (state) => {
            state.value = !(state.value);
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateReload } = reloadSlice.actions;

export default reloadSlice.reducer;