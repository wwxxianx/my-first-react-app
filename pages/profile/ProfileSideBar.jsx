import Link from "next/link";
import React, { useEffect } from "react";
import { AiFillCloseCircle, AiOutlineHeart } from "react-icons/ai";
import { BsFillBagFill, BsFillPersonFill } from "react-icons/bs";
import { useStateContext } from "../../context/ContextWrapper";
import { profileSideBar } from "../../utils/constant";
import { buttonAlert } from "../../utils/buttonAlert";

const ProfileSideBar = ({
    showSideBar,
    setShowSideBar,
    validWishListProductLength,
}) => {
    const { userProfile, activeSideBar, setActiveSideBar } = useStateContext();

    const IconList = ({ icon, title }) => {
        return (
            <div
                className="lg:text-sm capitalize flex justify-between items-center my-2 hover:text-red cursor-pointer"
                onClick={() => buttonAlert()}
            >
                <div className="flex gap-2 items-center">
                    <p>{icon}</p>
                    <p>{title}</p>
                </div>
                <p>10</p>
            </div>
        );
    };

    return (
        <div>
            <div
                className={`${
                    showSideBar ? "block" : "hidden"
                } fixed top-0 left-0 h-[100vh] w-[100vw] z-40 bg-black/20`}
            ></div>
            {/* Sidebar */}
            <div
                className={`${
                    showSideBar ? "translate-x-0" : "translate-x-[-100%]"
                } lg:flex-none lg:z-auto lg:w-[270px] md:space-y-0 md:translate-x-0 md:relative md:h-auto md:w-full md:mt-5 shadow-sm md:rounded-md md:py-3 transition duration-500 ease-in-out fixed top-0 left-0 z-50 h-[100vh] w-[25vw] bg-white px-5 py-7 text-blue space-y-10`}
            >
                <button
                    className="md:hidden hover:scale-x-110 hover:scale-y-110"
                    onClick={() => setShowSideBar(false)}
                >
                    <AiFillCloseCircle />
                </button>
                <div>
                    <h3 className="text-gray uppercase text-md md:pt-2 lg:text-xs">
                        dashboard
                    </h3>
                    <div
                        className={`${
                            activeSideBar === "order"
                                ? "text-red font-semibold"
                                : ""
                        } lg:text-sm flex justify-between items-center my-2 hover:text-red cursor-pointer`}
                        onClick={() => buttonAlert()}
                    >
                        <p className="flex items-center gap-2">
                            <BsFillBagFill /> <span>Orders</span>
                        </p>
                        <p>5</p>
                    </div>
                    <div
                        className={`${
                            activeSideBar === "wishList"
                                ? "text-red font-semibold"
                                : ""
                        } lg:text-sm flex justify-between items-center hover:text-red cursor-pointer`}
                        onClick={() => setActiveSideBar("wishList")}
                    >
                        <p className="flex items-center gap-2">
                            <AiOutlineHeart /> <span>Wishlist</span>
                        </p>
                        <p>{validWishListProductLength}</p>
                    </div>
                </div>

                <div>
                    <h3 className="lg:text-xs text-gray uppercase text-md lg:mt-5">
                        account settings
                    </h3>
                    {profileSideBar.map(({ icon, title }) => (
                        <IconList icon={icon} title={title} key={title}/>
                    ))}
                    <div
                        className={`${
                            activeSideBar === "profile"
                                ? "text-red font-semibold"
                                : ""
                        } lg:text-sm capitalize flex justify-between items-center my-2 hover:text-red cursor-pointer`}
                        onClick={() => setActiveSideBar("profile")}
                    >
                        <div className="flex gap-2 items-center">
                            <p>
                                <BsFillPersonFill />
                            </p>
                            <p>profile info</p>
                        </div>
                        <p>10</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSideBar;
