/*
Core Libs
*/
import React from 'react';

/*
Material UI Components
*/
import CircularProgress from 'material-ui/CircularProgress';


const AuthCallback = () => (
    <div style={{height: '100vh', textAlign:'center'}}> 
        <CircularProgress size={60} thickness={7} style={{margin: 'auto'}} />
    </div>
) 

export default AuthCallback;
