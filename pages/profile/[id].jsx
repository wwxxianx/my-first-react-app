import React, { useState } from "react";
import {
    BsFillPersonFill,
    BsFillCreditCardFill,
    BsFillBagFill,
} from "react-icons/bs";
import {
    AiOutlineMenu,
    AiOutlineHeart,
    AiFillCloseCircle,
} from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io";
import { Avatar } from "@mui/material";
import { useStateContext } from "../../context/ContextWrapper";
import Link from "next/link";
import { profileSideBar } from "../../utils/constant";
import ProfileLayout from "./ProfileLayout";
import UserInfo from "./UserInfo";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { client } from "../../lib/client";

const Profile = ({ wishList, user }) => {
    const [showSideBar, setShowSideBar] = useState(false);
    const { activeSideBar } = useStateContext();
    let wishListProducts = [];

    if(wishList) {
        const destructuredWishList = wishList.map(({wishList}) => [...wishList]);
        destructuredWishList.map((wishListArr) => {
            for (let i = 0; i < wishListArr.length; i++) {
                if(wishListArr[i] !== null && 
                    Object.keys(wishListArr[i]).length !== 0 &&
                    wishListArr[i] !== 'null' &&
                    wishListArr[i] !== 'undefined') {
                    console.log(wishListArr[i]);
                    wishListProducts.push(wishListArr[i]);
                }
            }
        });
    }

    return (
        <ProfileLayout
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            validWishListProductLength={wishListProducts.length}
        >
            {console.log('user in Profile Page: ', user)}
            {activeSideBar === "profile" && (
                <UserInfo setShowSideBar={setShowSideBar} user={user}/>
            )}
            {activeSideBar === "wishList" && (
                <div className="w-full">
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

                    <div className="flex gap-5 w-full flex-wrap">
                        {wishListProducts.map((product) => (
                            <ProductCard
                                product={product}
                                wishListSettings="w-[450px] m-auto tablet:flex-1 tablet:min-w-[300px] tablet:max-w-[300px] 
                                tablet:m-0 lg:max-w-[300px]"
                                mainPageSettings=""
                                key = {product.id}
                            />
                        ))}
                    </div>
                </div>
            )}
        </ProfileLayout>
    );
};

export default Profile;

export const getServerSideProps = async (context) => {
    const userId = context.params.id;
    const wishListProductQuery = `*[_type == "user" && _id == '${userId}']{ wishList[]->{
        image, price, title, slug, _id
    }}`;
    const wishList = await client.fetch(wishListProductQuery);

    const userQuery = `*[_type == "user" && _id == '${userId}'][0]`;
    const user = await client.fetch(userQuery);

    return {
        props: { wishList, user },
    };
}
