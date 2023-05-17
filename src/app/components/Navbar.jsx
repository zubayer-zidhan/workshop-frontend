import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const userId = useSelector((state) => state.userId.value);
    const isLogged = useSelector((state) => state.isLoggedIn.value);
  

    return (
        <div className='bg-gray-800'>
            <div className='h-16 px-4 flex items-center'>
                <p className=' text-white font-bold flex-1'>Workshop Booking</p>
                {isLogged ? <p className='text-white font-bold'>Logged in as user: {userId}</p> : <></>}
            </div>
        </div>
    );
}

export default Navbar;
