import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

function DeleteBook(props) {
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams()

    const handleDeleteBook = ()=>{

        const isUser = localStorage.getItem('authToken')
        if (!isUser) {
            navigate('/');
            enqueueSnackbar("Please Log in first", { variant: "error" });
            return; // Exit early after navigation
        }
        setLoading(true);
        axios
            .delete(`http://3.87.22.48:5555/books/${id}`)
            .then(()=>{
                setLoading(false);
               
                navigate('/')
            })
            .catch((err)=>{
               
                console.log(err);
            })
    }

    return (
        <div className='p-4'>
            <BackButton/>
            <h1 className='text-3xl my-4'> Delete Book</h1>
            {
                loading ? <Spinner/> :
                <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>

                    <h3 className='text-2xl'>Are You Sure You Want To Delete This Book?</h3>
                    <button className='p-4 bg-red-600 text-white m-8 w-full'
                        onClick={handleDeleteBook}>
                        Yes, Delete it..
                    </button>
                </div>
            }
           
        </div>
    );
}

export default DeleteBook;