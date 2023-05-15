import React from 'react';
import ListBox from '../components/ListBox';
import { useSelector, useDispatch } from 'react-redux';


const ListBoxes = () => {
    const getWorkshopsUrl = useSelector((state) => state.getWorkshops.value);


    return (
        <div className="flex space-x-10">
            <ListBox url="http://localhost:8080/getCities" placeholder="Select City" name="cities" />
            <ListBox url={getWorkshopsUrl} placeholder="Select Workshop" name="workshops" />
        </div>
    );
}

export default ListBoxes;