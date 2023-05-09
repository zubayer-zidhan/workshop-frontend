import React, { useState } from "react";

const Book = () => {
    const [bookingData, setBookingData] = useState({
        wid: "",
        uid: "",
        date: "",
    });

    const [bookReply, setBookReply] = useState("");

    const BOOK_WORKSHOP_URL = `http://localhost:8080/book-with-workshopid?wid=${bookingData.wid}&uid=${bookingData.uid}&bdate=${bookingData.date}`;
    const USERS_BASE_URL = "http://localhost:8080/getUsers";


    console.log(BOOK_WORKSHOP_URL);


    // Handle Change of Input Field Function
    const handleChange = (e) => {
        const value = e.target.value;
        setBookingData({...bookingData, [e.target.name]: value});
    }

    // Make the post request to book a slot
    const bookSlot = async (e) => {
        e.preventDefault();

        await fetch(BOOK_WORKSHOP_URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => response.text())
        .then(text => {
            console.log(text);
            setBookReply(text);
            return text;
        })
        .catch(error => {
            console.error(error);
        })


        // reset(e);
    }

    // Reset the field values
    const reset = (e) => {
        e.preventDefault();
        setBookingData({
            wid: "",
            uid: "",
            date: "",
        });
        setBookReply("");
    }


    return (
        <div>
            <h1 className="text-8xl">Book</h1>
            <div className="mt-5">
                <label className="mr-5 ml-3">User ID</label>
                <input 
                    type="text" 
                    name="uid" 
                    value={bookingData.uid}
                    onChange={(e) => handleChange(e)}
                    width={12} 
                />
            </div>
            <div className="mt-5">
                <label className="mr-5 ml-3">Workshop ID</label>
                <input 
                    type="text" 
                    name="wid"
                    value={bookingData.wid} 
                    onChange={(e) => handleChange(e)}
                    width={12} 
                />
            </div>
            <div className="mt-5">
                <label className="mr-5 ml-3">Date</label>
                <input 
                    type="date" 
                    name="date" 
                    value={bookingData.date}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="mt-5 mx-1">
                <button 
                    onClick={bookSlot}
                    className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded-md text-lg mx-2">
                    Submit
                </button>
                <button
                    onClick={reset}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md text-lg"
                >
                    Reset
                </button>
            </div>
            <h1 className="text-5xl mt-12">{bookReply}</h1>
        </div>
    );
};

export default Book;
