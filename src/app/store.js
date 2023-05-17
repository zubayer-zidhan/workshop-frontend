import { configureStore } from '@reduxjs/toolkit';
import getWorkshopsReducer  from '../slices/getWorkshopsSlice';
import isLoggedInReducer from '../slices/isLoggedInSlice';
import userIdReducer from "../slices/userIdSlice";
import isCitySelectedReducer from '../slices/isCitySelectedSlice';
import bookingDataCityReducer from '../slices/bookingDataCitySlice';
import bookingDataWorkshopReducer from '../slices/bookingDataWorkshopSlice';
import reloadReducer from '../slices/reloadSlice';

export const store = configureStore({
    reducer: {
        getWorkshops: getWorkshopsReducer,
        isLoggedIn: isLoggedInReducer,
        userId: userIdReducer,
        isCitySelected: isCitySelectedReducer,
        bookingDataCity: bookingDataCityReducer,
        bookingDataWorkshop: bookingDataWorkshopReducer,
        reload: reloadReducer,
    },
});