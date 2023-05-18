import React from 'react';
import Book from '../components/Book';
import ListBoxes from "./ListBoxes";
import RadioButton from '../components/Radiobutton';

const SecondPage = () => {
    return (
        <div className='flex items-center justify-center text-center mt-12'>
            <div>
                <h1 className="text-8xl font-semibold">Book</h1>
                <RadioButton />
                <ListBoxes />
                <Book />

            </div>
        </div>
    );
}

export default SecondPage;