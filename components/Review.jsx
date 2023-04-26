import React from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useStateContext } from '../context/ContextWrapper'
import { urlFor } from '../lib/client';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const Review = ({ review }) => {
    const { allUsers } = useStateContext();
    
    return (
        <div className='py-5'>
            {allUsers?.length && 
            allUsers.map((user) => user._id === review.postedBy._ref && (
                <div>
                    <div className='flex gap-2 items-center'>
                        <Link href={`/profile/${user._id}`}>
                            <Avatar
                                src={user.picture}
                                alt='User Profile Image'
                                className='cursor-pointer'
                            />
                        </Link>
                        {/* Poster Desc */}
                        <div>
                            <Link href={`/profile/${user._id}`}>
                                <p className='cursor-pointer ml-1 text-md font-medium'>{user.name}</p>
                            </Link>
                            {/* Review Star */}
                            <div className='flex items-center ml-1 text-[#FAAF00]'>
                                <p><AiFillStar /></p>
                                <p><AiFillStar /></p>
                                <p><AiFillStar /></p>
                                <p><AiFillStar /></p>
                                <p><AiFillStar /></p>
                                <p><AiFillStar /></p>
                                <p className='text-black font-medium ml-1'>4.7</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-gray text-md '>{review.review}</p>
                </div>
            ))}
        </div>
    )
}

export default Review