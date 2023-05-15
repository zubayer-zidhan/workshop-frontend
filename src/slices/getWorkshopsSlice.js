import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "http://localhost:8080/getWorkshops",
}


export const getWorkshopsSlice = createSlice({
    name: "getWorkshops",
    initialState,
    reducers: {
        updateWorkshopURL: (state, action) => {
            if(action.payload != undefined) {
                state.value = "http://localhost:8080/getWorkshopsByCity?city_id=" + action.payload;
            } else {
                state.value = "http://localhost:8080/getWorkshops"; 
            }
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateWorkshopURL } = getWorkshopsSlice.actions;

export default getWorkshopsSlice.reducer;