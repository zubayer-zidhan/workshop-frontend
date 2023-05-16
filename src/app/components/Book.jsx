import React, { useState } from "react";
import { Snackbar, Alert} from '@mui/material';
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedIn } from "../../slices/isLoggedInSlice";



const StyledSnackbar = styled((props) => <Snackbar {...props} />)(
  ({ theme }) => ({
    "& .MuiSnackbar-root": {
      top: theme.spacing(15),
    },
  })
);


const Book = () => {

    // Constants
    const SUCCESS = "SUCCESS";
    const NO_SLOTS = "No Slots Available at the required workshop on the given date";

    const userId = useSelector((state) => state.userId.value);

    const dispatch = useDispatch();


    // Set Booking Data
    const [bookingData, setBookingData] = useState({
        wid: "",
        uid: "",
        date: "",
    });


    // Toogle Snackbar state
    const [alertType, setAlertType] = useState({
        open: false,
        type: "info",
    });


    // Handle Closing of Alert
    const handleClose = () => {
        setAlertType({...alertType, open: false});
    }




    // Set Booking Reply Message
    const [bookReply, setBookReply] = useState("");

    // URL
    const BOOK_WORKSHOP_URL = "http://localhost:8080/book-with-workshopid";



    // console.log(BOOK_WORKSHOP_URL);


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
            body: JSON.stringify(bookingData),
        }).then(response => response.text())
        .then(text => {
            // console.log(text);
            setBookReply(text);
            if(text === SUCCESS) {
                setAlertType({type: "success", open: true});
            } else if(text === NO_SLOTS) {
                setAlertType({type: "info", open: true});
            } else {
                setAlertType({type: "error", open: true}); 
            }
            return text;
        })
        .catch(error => {
            console.error(error);
        })

        // Reset the Input Fields
        reset(e);
    }


    // Reset the field values
    const reset = (e) => {
        e.preventDefault();
        setBookingData({
            wid: "",
            uid: "",
            date: "",
        });
    }


    // Handle the logout button
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(updateLoggedIn(0));
    }


    return (
        <div>
            <div className="mt-5">
                <h3>User Id is: {userId}</h3>
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
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md text-lg mr-2"
                >
                    Reset
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-teal-500 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-lg"
                >
                    Logout
                </button>
            </div>
            <StyledSnackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alertType.open}
                onClose={handleClose}
                autoHideDuration={3000}
            >
                <Alert severity={alertType.type} onClose={handleClose}>
                    {bookReply}
                </Alert>
            </StyledSnackbar>
        </div>
    );
};

export default Book;
