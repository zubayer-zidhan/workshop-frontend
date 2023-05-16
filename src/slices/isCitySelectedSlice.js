import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
}


export const isCitySelectedSlice = createSlice({
    name: "isCitySelected",
    initialState,
    reducers: {
        updateCitySelected: (state, action) => {
            if(action.payload === 1) {
                state.value = true;
            } else {
                state.value = false;
            };
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateCitySelected } = isCitySelectedSlice.actions;

export default isCitySelectedSlice.reducer;