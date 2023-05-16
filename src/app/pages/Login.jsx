import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography,Button } from '@mui/material';
import { ThemeProvider,createTheme } from '@mui/material/styles';
// import LoginIcon from '@mui/icons-material/Login';
import { LoginOutlined } from '@mui/icons-material';
import { useDispatch } from "react-redux";




const login = () => {
    // Dispatcher function
    const dispatch = useDispatch();
    

    // User Data for checking if user exists
    const [userData, setUserData] = useState({
        name : "",
        email : "",
    });


    // Base findUserId URL
    const BASE_USER_URL = "http://localhost:8080/findUserId";



    // Handle Change of Input Field Function
    const handleChange = (e) =>{
        const value = e.target.value;
        setUserData({...userData, [e.target.name]: value.trim()});
    }

    const checkUserData = async (e) =>{
        e.preventDefault();
        console.log(userData);

        await fetch(BASE_USER_URL, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        }).then(response => response.text())
        .then(text => {
            console.log(text);
            if(text === "-404") {
                console.log("Invalid name or email.");
            } else {
                console.log(`User exists ${text}`);
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
        <form onSubmit={checkUserData}>
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
        
        
    </div>

    )
}

export default login;
