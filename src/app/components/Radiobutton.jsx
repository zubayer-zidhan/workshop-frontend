import React from 'react';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch } from 'react-redux';
import { updateCitySelected } from '../../slices/isCitySelectedSlice';
import { updateBookingDataCity } from '../../slices/bookingDataCitySlice';
import { updateBookingDataWorkshop } from '../../slices/bookingDataWorkshopSlice';
import { updateReload } from '../../slices/reloadSlice';


export default function RadioButton() {

    const dispatch = useDispatch();

    const [alignment, setAlignment] = useState('city');

    
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);

            dispatch(updateBookingDataCity({field: "date", value: ""}));
            dispatch(updateBookingDataWorkshop({field: "date", value: ""}));
            dispatch(updateBookingDataWorkshop({field: "wid", value: ""}));

            dispatch(updateReload());

            if(newAlignment === "city") {
                dispatch(updateCitySelected(1));
            } else {
                
                dispatch(updateCitySelected(0));
            }
        }
      };
      

    return (
        <div className='mt-3 '>

            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive = {true}
                onChange={handleAlignment}
                aria-label="Platform"
            >
                <ToggleButton value="city">City</ToggleButton>
                <ToggleButton value="workshop">Workshop</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}