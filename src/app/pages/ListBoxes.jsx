import React from 'react';
import ListBox from '../components/ListBox';

const ListBoxes = () => {
    return (
        <div className="flex space-x-10">
            <ListBox url="http://localhost:8080/getCities" placeholder="Select City"/>
            <ListBox url="http://localhost:8080/getWorkshops" placeholder="Select Workshop" />
        </div>
    );
}

export default ListBoxes;