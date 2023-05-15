import React from 'react';
import ListBox from '../components/ListBox';
import { useSelector } from 'react-redux';
import {isComponentEnabled} from '../components/Radiobutton'


const ListBoxes = () => {
    const getWorkshopsUrl = useSelector((state) => state.getWorkshops.value);


    return (
        <div className="flex space-x-10">
            {/* {isComponentEnabled = {city} ? <ListBox url="http://localhost:8080/getCities" placeholder="Select City" name="cities" /> 
            : <ListBox url={getWorkshopsUrl} placeholder="Select Workshop" name="workshops" /> } */}
            <ListBox url="http://localhost:8080/getCities" placeholder="Select City" name="cities" />
            <ListBox url={getWorkshopsUrl} placeholder="Select Workshop" name="workshops" />
        </div>
    );
}

export default ListBoxes;