import { configureStore } from '@reduxjs/toolkit';
import getWorkshopsReducer  from '../slices/getWorkshopsSlice';

export const store = configureStore({
    reducer: {
        getWorkshops: getWorkshopsReducer,
    },
});