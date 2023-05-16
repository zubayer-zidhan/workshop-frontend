import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
}


export const userIdSlice = createSlice({
    name: "userId",
    initialState,
    reducers: {
        updateUserId: (state, action) => {
            state.value = action.payload;
        }
    },
});


// Action creators are generated for each case reducer function
export const { updateUserId } = userIdSlice.actions;

export default userIdSlice.reducer;