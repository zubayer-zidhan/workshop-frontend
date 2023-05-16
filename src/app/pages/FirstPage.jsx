import React from 'react';
import Login from "./Login";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";


const FirstPage = () => {

    const isLogged = useSelector((state) => state.isLoggedIn.value);
    console.log(isLogged);
    return (
        <>
            <Navbar />
            <main className="">
                {/* <Book />
                <ListBoxes />
                <Radiobutton /> */}
                <Login />

            </main>
        </>
        
    );
}

export default FirstPage;