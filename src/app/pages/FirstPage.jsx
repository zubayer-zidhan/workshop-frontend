import React from 'react';
import Login from "./Login";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import SecondPage from './SecondPage';


const FirstPage = () => {

    const isLogged = useSelector((state) => state.isLoggedIn.value);
    // console.log(isLogged);
    return (
        <>
            <Navbar />
            <main className="">
                {
                    isLogged ? <SecondPage /> : <Login />
                }
                {/* <Book />
                <ListBoxes />
                <Radiobutton /> */}
                {/* <Login /> */}

            </main>
        </>
        
    );
}

export default FirstPage;