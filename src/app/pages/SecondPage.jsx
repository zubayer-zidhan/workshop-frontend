import React from 'react';
import Book from '../components/Book';
import ListBoxes from "./ListBoxes";
import RadioButton from '../components/Radiobutton';

const SecondPage = () => {
    return (
        <div className='flex items-center justify-center text-center mt-12'>
            <div>
                <div className='flex items-center mt-1 space-x-3 '>
                    <h3 className='text-lg mt-2'>Book using: </h3>
                     <RadioButton /> 
                </div>
                <ListBoxes />
                <Book />

            </div>
        </div>
    );
}

export default SecondPage;