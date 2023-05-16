import { configureStore } from '@reduxjs/toolkit';
import getWorkshopsReducer  from '../slices/getWorkshopsSlice';
import isLoggedInReducer from '../slices/isLoggedInSlice';
import userIdReducer from "../slices/userIdSlice";

export const store = configureStore({
    reducer: {
        getWorkshops: getWorkshopsReducer,
        isLoggedIn: isLoggedInReducer,
        userId: userIdReducer,
    },
});