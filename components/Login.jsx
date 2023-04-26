import React, { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextWrapper";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { createUser } from "../utils/createUser";
import toast from 'react-hot-toast';
import jwt_decode from "jwt-decode";
import { client } from "../lib/client";


const Login = () => {
    const { displayLogin, setDisplayLogin, userProfile, setUserProfile } = useStateContext();
 

    const handleLogin = (googleResponse) => {
        console.log('Google Response: ', jwt_decode(googleResponse.credential));
        let decodedUser = jwt_decode(googleResponse.credential);

        let { email, name, picture, sub, family_name, given_name } = decodedUser;

        //save to context
        //& send to sanity
        let user = {
            _id: sub,
            _type: 'user',
            email,
            name,
            picture,
            firstName: family_name,
            lastName: given_name,
        }

        createUser(user)
            .then((userData) => {
                setUserProfile(userData);
                toast.success('Login Success!');
                setDisplayLogin(false);
            })
            .catch(err => {
                toast.error('Login Failed!');
                setDisplayLogin(false);
            });
            
    }

    const removeUser = () => {
        //set UserProfile to empty
        setUserProfile();
        toast.success('Logged Out!');
        setDisplayLogin(false);
        if (typeof localStorage !== undefined) {
            localStorage.removeItem('user');
        }
    }

    useEffect(() => {
        if (userProfile && typeof localStorage !== undefined) {
            localStorage.setItem("user", JSON.stringify(userProfile));
        }
    }, [userProfile]);

    // const getUserFromSanity = async (user) => {
    //     const userQuery = `*[_type == "user" && _id == "${user._id}"][0]`;

    //     const userData = await client.fetch(userQuery);
    //     console.log('User from Sanity: ', userData);
    //     return userData;
    // }

    return (
        <>
            {displayLogin && (
                <div className="w-full h-full fixed top-0 z-50 bg-black/25 flex justify-center items-center">
                    {userProfile ? (
                        <div className="relative py-10 h-[50vh] w-[30vw] rounded-md shadow-md bg-white flex gap-3 flex-col justify-start items-center">
                            <button 
                                onClick={() => setDisplayLogin(false)}
                                className="absolute top-[20px] right-[20px] text-red transition duration-300 ease-in-out hover:scale-x-110 hover:scale-y-110"
                            ><AiOutlineCloseCircle /></button>
                            <h1 className="font-semibold text-blue text-lg">Welcome to Mex Ecommerce! 🎉</h1>
                            <img
                                src='/online-shopping.png'
                                alt='Shop Logo'
                                className='mt-4'
                            />
                            <div className="flex flex-col w-full px-[100px]">
                                <button 
                                    className="border-[1px] rounded-md border-red mt-3 hover:border-red-hover hover:text-red-hover flex-1 font-semibold text-red py-2"
                                    onClick={() => setDisplayLogin(false)}    
                                >Shop Now</button>
                                <button 
                                    className="bg-red flex-1 font-semibold rounded-md mt-5 hover:bg-red-hover text-white py-2"
                                    onClick={() => {
                                        googleLogout();
                                        removeUser();
                                    }}    
                                >Log Out</button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative py-10 h-[50vh] w-[30vw] rounded-md shadow-md bg-white flex gap-3 flex-col justify-start items-center">
                            <button 
                                onClick={() => setDisplayLogin(false)}
                                className="absolute top-[20px] right-[20px] text-red transition duration-300 ease-in-out hover:scale-x-110 hover:scale-y-110"
                            ><AiOutlineCloseCircle /></button>
                            <h1 className="font-semibold text-blue text-lg">Welcome to Mex Ecommerce</h1>
                            <p className="text-xs text-gray">Login in with Google</p>
                            <GoogleLogin 
                                onSuccess={(response) => {
                                    handleLogin(response);
                                }}
                                onError={(error) => console.log(error)}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    )
};
export default Login;
