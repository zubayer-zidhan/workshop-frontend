import React, { useState } from "react";
import { Snackbar, Alert, Button, Stack, Box} from '@mui/material';
import { styled } from "@mui/material/styles";
import { Logout } from '@mui/icons-material';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { updateLoggedIn } from "../../slices/isLoggedInSlice";
import { updateBookingDataCity } from "@/slices/bookingDataCitySlice";
import { updateBookingDataWorkshop } from "@/slices/bookingDataWorkshopSlice";
import { updateCitySelected } from "../../slices/isCitySelectedSlice";



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
    const NO_SLOTS_CITY = "No Slots Available at the required city on the given date";


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

        if(bookingDataCity.date === "" &&  bookingDataWorkshop.date === "") {
            setBookReply("Invalid Date")
            setAlertType({type: "error", open: true}); 
        } else {
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
                    } else if(text === NO_SLOTS_CITY) {
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
        dispatch(updateCitySelected(1));
        dispatch(updateLoggedIn(0));
    }

     //To change the properties of button
     const theme = createTheme({
        palette: {
          primary: {
            main: '#098978',
            contrastText : "#fff",        
          }, 
          
        },
      });


    return (
        <div>
            <Box
                display={'flex'} 
                flexDirection={'column'} 
                maxWidth={500} 
                alignItems={'center'} 
                justifyContent={'center'} 
                margin={'auto'}
                marginTop={-2} 
                padding={3}
                
                
            
            >
            <div className="mt-5 data-te-datepicker-init data-te-input-wrapper-init">
                <input 
                    className="peer block min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-50 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-400 dark:placeholder:text-neutral-300 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    type="date" 
                    name="date" 
                    value={citySelected ? bookingDataCity.date : bookingDataWorkshop.date}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className=" flex justify-center mt-5 mx-1">
                <ThemeProvider theme={theme}>
                    <Button
                            onClick={bookSlot}
                            sx={{marginTop : 3,background:'primary.main',color: 'black',marginRight : 2,"&:hover" : {color:'white'} }} 
                            variant='contained'
                    >
                        Submit
                    </Button>
                    <Button 
                        endIcon = {<Logout /> }
                        onClick={handleLogout}
                        sx={{marginTop : 3,background:'primary.main',color: 'black',"&:hover" : {color:'white'}}} 
                        variant='contained'
                    >
                        Logout
                    </Button>
                </ThemeProvider>
                    
            </div>
            </Box>
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
