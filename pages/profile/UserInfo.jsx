import { Avatar } from '@mui/material';
import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useStateContext } from '../../context/ContextWrapper';

const UserInfo = ({ setShowSideBar, user}) => {
    const { userProfile } = useStateContext();

    return (
        <div className="flex-1">
            {/* Heading */}
            <div className="flex justify-between my-5">
                <h3 className="flex items-center gap-2 text-blue font-bold text-2xl">
                    <p className="text-red">
                        <BsFillPersonFill />
                    </p>
                    My Profile
                </h3>
                <button
                    className="text-gray hover:text-blue text-lg md:hidden"
                    onClick={() => setShowSideBar(true)}
                >
                    <AiOutlineMenu />
                </button>
            </div>

            {/* User desc wrapper */}
            {console.log('user in UserInfo component: ', user)}
            <div className="flex flex-col gap-5 md:flex-row w-full">
                {/* User desc */}
                <div className="flex items-center justify-between bg-white shadow-md rounded-md px-5 py-4 flex-1">
                    <div className="flex items-center gap-2">
                        <Avatar src={user?.picture} />
                        {/* User Intro */}
                        <div className="flex flex-col">
                            <h4 className="text-sm font-semibold">
                                {/* {user.firstName} */}
                                User First Name
                            </h4>
                            <p className="text-gray text-xs">
                                Balance: <span className="text-red">$500</span>
                            </p>
                        </div>
                    </div>

                    <p className="uppercase text-gray/70 text-thin text-md">
                        silver user
                    </p>
                </div>

                {/* User four tags */}
                <div className="flex flex-col gap-5 flex-1 lg:flex-row">
                    <div className="flex flex-1 gap-4">
                        <div className="flex-1 text-center bg-white shadow-md rounded-md py-2 lg:px-5">
                            <p className="text-red font-medium">16</p>
                            <p className="text-gray text-xs">All orders</p>
                        </div>

                        <div className="flex-1 text-center bg-white shadow-md rounded-md py-2 lg:px-5">
                            <p className="text-red font-medium">02</p>
                            <p className="text-gray text-xs">
                                Awaiting Payments
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-1 gap-4">
                        <div className="flex-1 text-center bg-white shadow-md rounded-md py-2 lg:px-5">
                            <p className="text-red font-medium">00</p>
                            <p className="text-gray text-xs">
                                Awaiting Shipment
                            </p>
                        </div>

                        <div className="flex-1 text-center bg-white shadow-md rounded-md py-2 lg:px-5">
                            <p className="text-red font-medium">01</p>
                            <p className="text-gray text-xs">
                                Awaiting Delivery
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-5 py-3 bg-white rounded-md shadow-md flex flex-wrap justify-between my-5">
                <div className="space-y-1">
                    <p className="text-gray text-xs">First Name</p>
                    <p className="text-sm">
                        {/* {user.firstName} */}
                        User First Name
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray text-xs">Last Name</p>
                    <p className="text-sm">
                        {/* {user.lastName} */}
                        User Last Name
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray text-xs">Email</p>
                    <p className="text-sm">
                        {/* {user.email} */}
                        User Email
                    </p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray text-xs">Phone</p>
                    <p className="text-sm">+1983649392983</p>
                </div>
                <div className="space-y-1">
                    <p className="text-gray text-xs">Birth Date</p>
                    <p className="text-sm">01 Jan, 1970</p>
                </div>
            </div>
        </div>
    );
};

export default UserInfo