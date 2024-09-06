import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import '../index.css';


function CreateUser(props) {

    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackBar } = useSnackbar()
    const handleSaveUser = () => {


        const data = {
            userName: userName,
            email: email,
            password: password,
            phone: phone
        }

        if (password === confirmPassword) {
            axios
                .post(`http://3.87.22.48:5555/users`, data)
                .then((res) => {
                    const response = res.data.message
                    if (response) {
                        enqueueSnackbar(response, { variant: "error" })
                        console.log(response);
                    } else {
                        enqueueSnackbar('Created Account Successfully', { variant: "success" })
                        const loginData = {
                            email: email,
                            password: password
                        }
                        axios
                            .post(`https://book-store-mern-server-two.vercel.app/users/login`, loginData)
                            .then((res) => {
                                const response = res.data
                                if (response.status === "error") {
                                    enqueueSnackbar(response.message, { variant: "error" })
                                } else {
                                    localStorage.setItem("authToken", res.data.authToken)
                                    navigate('/');
                                    enqueueSnackbar(response.message, { variant: "success" })
                                }
                            })
                            .catch((err)=>{
                                console.log(err);
                            })

                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
        } else {
            enqueueSnackbar('Password mismatch', { variant: "error" })  // do frontend validations
        }
    }

    return (
        <div>
            <div className='m-4'>
                <BackButton />
            </div>
            <div className='flex justify-center'>

                <div className="w-full max-w-xs">
                    <h1 className='text-3xl m-3 flex justify-center'>Create Account</h1>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username" type="text" placeholder="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                email
                            </label>
                            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" type="email" placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                mobile number
                            </label>
                            <input className="remove-arrow shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="mobile" type="number" placeholder="mobile"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password" type="password" placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirm-password" type="password" placeholder=""
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSaveUser}
                            >
                                Sign Up
                            </button>

                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2020 Acme Corp. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;