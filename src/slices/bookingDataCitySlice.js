import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
}


export const bookingDataCitySlice = createSlice({
    name: "bookingDataCity",
    initialState,
    reducers: {
        updateBookingDataCity: (state, action) => {
            
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateWorkshopURL } = bookingDataCitySlice.actions;

export default bookingDataCitySlice.reducer;