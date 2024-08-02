import React from 'react';
import { useNavigate } from 'react-router-dom';
function LoggedIn(props) {
    const navigate = useNavigate()


    const handleLogOut = ()=>{
        localStorage.removeItem("authToken");
        navigate('/users/login')
    }
    return (
        <div className='flex justify-center items-center gap-x-4'>
            <button
                className='bg-red-300 hover:bg-red-600 px-4 py-1 rounded-lg'
                onClick={handleLogOut}
            >
                Logout
            </button>
        </div>
    );
}

export default LoggedIn;