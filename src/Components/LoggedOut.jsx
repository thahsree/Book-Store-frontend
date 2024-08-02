import React from 'react';
import { Link } from 'react-router-dom';

function LoggedOut(props) {
    return (
        <div className='flex justify-center items-center gap-x-4'>
            <Link
                className='bg-green-300 hover:bg-green-600 px-4 py-1 rounded-lg'
                to='/users/login'
            >
                login
            </Link>
            <Link
                className='bg-green-300 hover:bg-green-600 px-4 py-1 rounded-lg'
                to='/users/create'
            >
                signup
            </Link>
        </div>
    );
}

export default LoggedOut;