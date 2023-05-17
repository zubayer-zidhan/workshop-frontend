import React from 'react';
import ListBox from '../components/ListBox';
import { useSelector } from 'react-redux';


const ListBoxes = () => {
    const getWorkshopsUrl = useSelector((state) => state.getWorkshops.value);
    const citySelected = useSelector((state) => state.isCitySelected.value);
    const reload = useSelector((state) => state.reload.value);


    return (
        <div className="flex space-x-10">

            {
                citySelected ? 
                    <ListBox url="http://localhost:8080/getCities" placeholder="Select City" name="cities" reload={reload} /> 
                :   <>
                        <ListBox url="http://localhost:8080/getCities" placeholder="Select City" name="cities" reload={reload} />
                        <ListBox url={getWorkshopsUrl} placeholder="Select Workshop" name="workshops" />
                    </> 
            }
            
        </div>
    );
}

export default ListBoxes;