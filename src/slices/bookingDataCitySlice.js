import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        cid: "",
        uid: "",
        date: "",
    }
}


export const bookingDataCitySlice = createSlice({
    name: "bookingDataCity",
    initialState,
    reducers: {
        updateBookingDataCity: (state, action) => {
            const { field, value } = action.payload;
            state.data[field] = value; 
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateBookingDataCity } = bookingDataCitySlice.actions;

export default bookingDataCitySlice.reducer;