import React, { useState } from "react";
import { Snackbar, Alert} from '@mui/material';
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedIn } from "../../slices/isLoggedInSlice";
import { updateBookingDataCity } from "@/slices/bookingDataCitySlice";
import { updateBookingDataWorkshop } from "@/slices/bookingDataWorkshopSlice";



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

    const citySelected = useSelector((state) => state.isCitySelected.value);
    const bookingDataCity = useSelector((state) => state.bookingDataCity.data);
    const bookingDataWorkshop = useSelector((state) => state.bookingDataWorkshop.data);

    // const checkReload = useSelector((state) => state.reload.value);

    // console.log(bookingDataCity);
    // console.log(bookingDataWorkshop);
    // console.log(`Reload: ${checkReload}`);
    

    const dispatch = useDispatch();



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
    const BOOK_USING_CITY_URL = "http://localhost:8080/book-with-cityid";
    const BOOK_USING_WORKSHOP_URL = "http://localhost:8080/book-with-workshopid";




    // Handle Change of Input Field Function
    const handleChange = (e) => {
        const val = e.target.value;
        if(citySelected) {
            dispatch(updateBookingDataCity({field: "date", value: val}));
        } else {
            dispatch(updateBookingDataWorkshop({field: "date", value: val}));
        }
    }


    // Make the post request to book a slot
    const bookSlot = async (e) => {
        e.preventDefault();

        if(citySelected) {
            await fetch(BOOK_USING_CITY_URL, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDataCity),
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
        } else {
            await fetch(BOOK_USING_WORKSHOP_URL, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingDataWorkshop),
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
    }


    // Reset the field values
    const reset = (e) => {
        e.preventDefault();
        dispatch(updateBookingDataCity({field: "date", value: ""}));
        dispatch(updateBookingDataWorkshop({field: "date", value: ""}));
    }


    // Handle the logout button
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(updateBookingDataCity({field: "date", value: ""}));
        dispatch(updateBookingDataCity({field: "cid", value: ""}));
        dispatch(updateBookingDataWorkshop({field: "date", value: ""}));
        dispatch(updateBookingDataWorkshop({field: "wid", value: ""}));
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
                    value={citySelected ? bookingDataCity.date : bookingDataWorkshop.date}
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
