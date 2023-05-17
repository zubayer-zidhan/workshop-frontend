"use client";

import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography,Button } from '@mui/material';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import { LoginOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { Snackbar, Alert} from '@mui/material';
import { styled } from "@mui/material/styles";
import { updateUserId } from '../../slices/userIdSlice';
import { updateLoggedIn } from '../../slices/isLoggedInSlice';
import { updateBookingDataCity } from '../../slices/bookingDataCitySlice';
import { updateBookingDataWorkshop } from '../../slices/bookingDataWorkshopSlice';


// Styled Snack for alert messages
const StyledSnackbar = styled((props) => <Snackbar {...props} />)(
  ({ theme }) => ({
    "& .MuiSnackbar-root": {
      top: theme.spacing(15),
    },
  })
);





const Login = () => {
    // Dispatcher function
    const dispatch = useDispatch();

    // User Data for checking if user exists
    const [userData, setUserData] = useState({
        name : "",
        email : "",
    });


    // Set User Reply Message
    const [userReply, setUserReply] = useState("");

    // ************* SnackBar ******************
    // Toogle Snackbar state
    const [alertType, setAlertType] = useState({
        open: false,
        type: "info",
    });


    // Handle Closing of Alert
    const handleSnackbarClose = () => {
        setAlertType({...alertType, open: false});
    }
    // --------------- End SnackBar -----------------



    // Base findUserId URL
    const BASE_USER_URL = "http://localhost:8080/findUserId";



    // Handle Change of Input Field Function
    const handleChange = (e) =>{
        const value = e.target.value;
        setUserData({...userData, [e.target.name]: value.trim()});
    }

    const checkUserData = async (e) =>{
        e.preventDefault();
        // console.log(userData);

        await fetch(BASE_USER_URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then(response => response.text())
        .then(text => {
            // console.log(text);
            
            // If user id is returned(user exists)
            if(text === "-404") {
                setUserReply("Invalid name or email.")
                setAlertType({type: "error", open: true});
            } else {
                setUserReply("Logged in successfully")
                setAlertType({type: "success", open: true});
                dispatch(updateUserId(text));
                dispatch(updateBookingDataCity({ field: "uid", value: parseInt(text) }));
                dispatch(updateBookingDataWorkshop({ field: "uid", value: parseInt(text) }));
                dispatch(updateLoggedIn(1));
            }
        })
    }

    
    //To change the properties of button
    const theme = createTheme({
        palette: {
          primary: {
            main: '#00796b',
            contrastText : "#fff",        
          }, 
          
        },
      });

    return (
    <div>
        <form onSubmit={checkUserData} method='post'>
            <Box display={'flex'} 
                flexDirection={'column'} 
                maxWidth={500} 
                alignItems={'center'} 
                justifyContent={'center'} 
                margin={'auto'}
                marginTop={5} 
                padding={3}
                borderRadius={3}
                boxShadow={'5px 5px 8px #ccc'}

            > 
                <Typography variant='h2' padding={3} textAlign={'center'} >Login</Typography> 
                <TextField 
                    id="outlined-username" 
                    label="Name" 
                    type="text" 
                    margin='normal' 
                    name='name' 
                    value={userData.username}
                    onChange={(e)=>handleChange(e)}
                />
                <TextField 
                    id="outlined-email" 
                    label="Email Address" 
                    type="email" 
                    margin='normal'
                    name='email'
                    value={userData.email}
                    onChange={(e)=>handleChange(e)}
                />
                <ThemeProvider theme={theme}>
                    <Button 
                     type='submit' 
                     sx={{marginTop : 3,background:'primary.main',color: 'black'}} 
                     variant='contained'
                     endIcon = {<LoginOutlined />}
                    >
                          Login
                    </Button>
                </ThemeProvider>   
            </Box >
        </form>
        <StyledSnackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alertType.open}
                onClose={handleSnackbarClose}
                autoHideDuration={3000}
            >
                <Alert severity={alertType.type} onClose={handleSnackbarClose}>
                    {userReply}
                </Alert>
        </StyledSnackbar>
        
    </div>

    )
}

export default Login;
