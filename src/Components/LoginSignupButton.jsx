import React from 'react';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

function LoginSignupButton(props) {
 



    return (
        <div className='flex justify-center items-center gap-x-4'>
            {
                localStorage.getItem("authToken")? <LoggedIn/>: <LoggedOut/>
            }
        </div>
    );
}

export default LoginSignupButton;