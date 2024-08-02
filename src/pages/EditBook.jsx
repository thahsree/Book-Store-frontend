import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

function EditBook(props) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams()

    useEffect(() => {
        setLoading(true);
        axios
            .get(`https://book-store-mern-server-two.vercel.app/books/${id}`)
            .then((res) => {
                setAuthor(res.data.author);
                setTitle(res.data.title);
                setPublishedYear(res.data.publishedYear)
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false)
                console.log(err);
            })
    }, [])

    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishedYear
        };
        
        const isUser = localStorage.getItem('authToken')
        if (!isUser) {
            navigate('/');
            enqueueSnackbar("Please Log in first", { variant: "error" });
            return; // Exit early after navigation
        }
        setLoading(true)
        axios
            .put(`https://book-store-mern-server-two.vercel.app/books/${id}`, data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Published Year</label>
                    <input
                        type="text"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditBook;