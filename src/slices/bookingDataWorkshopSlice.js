import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        wid: "",
        uid: "",
        date: "",
    }
}


export const bookingDataWorkshopSlice = createSlice({
    name: "bookingDataWorkshop",
    initialState,
    reducers: {
        updateBookingDataWorkshop: (state, action) => {
            const { field, value } = action.payload;
            state.data[field] = value; 
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateBookingDataWorkshop } = bookingDataWorkshopSlice.actions;

export default bookingDataWorkshopSlice.reducer;