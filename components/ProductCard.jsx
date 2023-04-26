import React, { useEffect, useRef } from "react";
import { BsHeart } from "react-icons/bs";
import { urlFor } from "../lib/client";
import {
    AiOutlineStar,
    AiOutlineShoppingCart,
    AiFillHeart,
    AiOutlineHeart,
} from "react-icons/ai";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { useStateContext } from "../context/ContextWrapper";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product, mainPageSettings, wishListSettings }) => {
    const { image, title, price } = product;
    const { addToCart, userProfile, updateUserProfile } = useStateContext();
    let wishListProducts = userProfile?.wishList?.map((item) => item._ref);

    const likeRef = useRef(null);
    const unlikeRef = useRef(null);

    const customToast = (icon, product, action) => {
        toast((t) => (
            <div className="capitalize flex gap-1 items-center">
                <p className={`${action === "add" ? "text-red" : "text-gray"}`}>
                    {icon}
                </p>
                <p className="text-xs text-blue font-medium">
                    <span className="text-red font-semibold">{product}</span>{" "}
                    {action} {action === "add" ? "to" : "from"} wishlist!
                </p>
            </div>
        ));
    };

    const handleLike = async () => {
        if (likeRef.current.classList.contains("hidden")) {
            likeRef.current.classList.remove("hidden");
            likeRef.current.classList.add("block");
            unlikeRef.current.classList.add("hidden");
            customToast(<AiFillHeart />, title, "add");
            //add the item to user's wishlist
            const response = await axios.put(
                "http://localhost:3000/api/wishList",
                {
                    addToWishList: true,
                    userId: userProfile._id,
                    productId: product._id,
                }
            );

            updateUserProfile(response.data);
        } else {
            likeRef.current.classList.remove("block");
            likeRef.current.classList.add("hidden");
            unlikeRef.current.classList.remove("hidden");
            unlikeRef.current.classList.add("block");
            customToast(<HiOutlineEmojiSad />, title, "remove");

            const response = await axios.put(
                "http://localhost:3000/api/wishList",
                {
                    addToWishList: false,
                    userId: userProfile._id,
                    productId: product._id,
                }
            );

            updateUserProfile(response.data);
        }
    };

    return (
        <div
            className={`
            productCard 
            ${mainPageSettings} 
            ${wishListSettings} 
            cursor-pointer 
            transition 
            duration-500 
            ease-in-out 
            bg-white 
            shadow-md 
            rounded-md 
            py-2 pl-2 pr-4`}
        >
            {/* Header Tags */}
            <div className="flex justify-between">
                <p className="text-xs text-white px-3 py-1 bg-red font-bold rounded-full">
                    25% off
                </p>
                <button onClick={handleLike}>
                    <p
                        ref={likeRef}
                        className={`${
                            wishListProducts?.includes(product._id)
                                ? "block"
                                : "hidden"
                        } text-red`}
                    >
                        <AiFillHeart />
                    </p>
                    <p
                        ref={unlikeRef}
                        className={`${
                            wishListProducts?.includes(product._id)
                                ? "hidden"
                                : "block"
                        } text-blue 
                                    hover:text-red`}
                    >
                        <AiOutlineHeart />
                    </p>
                </button>
            </div>

            <Link href={`/product/${product.slug.current}`}>
                <div>
                    {/* Image */}
                    <Image
                        src={urlFor(image[0]).url()}
                        alt="Product Image"
                        width={200}
                        height={200}
                        layout="responsive"
                        className="
                            transition
                            duration-300
                            ease-in-out
                            scale-100
                            hover:scale-110
                        "
                    />

                    {/* Bottom */}
                    <div className="mt-auto">
                        <h1 className="capitalize text-blue font-semibold text-md">
                            {title}
                        </h1>
                        <div className="flex gap-0.5 text-red">
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-semibold text-red">
                                ${price}{" "}
                                <span className="text-gray-300 line-through">
                                    1000.00
                                </span>
                            </p>
                            <button
                                className="relative text-white bg-red rounded-full p-1 transition ease-in-out duration-300 
                                        hover:scale-x-110 hover:scale-y-110"
                                onClick={() => addToCart(product, 1)}
                            >
                                <AiOutlineShoppingCart />{" "}
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
