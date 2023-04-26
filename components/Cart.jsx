import React from "react";
import { MdOutlineShoppingBag, MdRemoveShoppingCart } from "react-icons/md";
import {
    AiOutlineCloseCircle,
    AiOutlinePlusCircle,
    AiOutlineMinusCircle,
} from "react-icons/ai";
import { useStateContext } from "../context/ContextWrapper";
import { urlFor } from "../lib/client";
import Image from "next/image";
import { GrFormClose } from "react-icons/gr";

const Cart = () => {
    const {
        cartItems,
        setShowCart,
        addToCart,
        removeFromCart,
        deleteCartItem,
        cartTotalQuantities,
        cartTotalPrice,
    } = useStateContext();

    return (
        <div className="z-50 absolute top-0 right-0 w-[100vw] h-[100vh] bg-black/25 ">
            <div className="w-[70vw] md:w-[50vw] lg:w-[26vw] right-0 absolute bg-white h-[100vh]">
                <div className="px-5 py-5">
                    {/* Heading & Close Button */}
                    <div className="flex justify-between items-center">
                        <p className="flex gap-2 items-center font-semibold text-blue">
                            <MdOutlineShoppingBag className="text-xl" />{" "}
                            <span>{cartTotalQuantities} item</span>
                        </p>
                        <button
                            className="text-xl"
                            onClick={() => setShowCart(false)}
                        >
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                </div>

                {/* Items */}
                {cartItems?.length < 1 && (
                    <div className="text-center h-full flex flex-col justify-center items-center">
                        <p className="text-[100px]">
                            <MdRemoveShoppingCart />
                        </p>
                        <p className="text-gray text-md">
                            Your shopping bag is empty.
                            <br />
                            Start shopping
                        </p>
                    </div>
                )}

                {cartItems?.length > 0 &&
                    cartItems.map((cartItem) => (
                        <div
                            className="flex border-y-[1px] border-gray-300/50 items-center px-5 py-2"
                            key={cartItem._id}
                        >
                            <div className="flex flex-col items-center justify-center">
                                <button
                                    className={`text-red text-2xl`}
                                    onClick={() => addToCart(cartItem, 1)}
                                >
                                    <AiOutlinePlusCircle />
                                </button>
                                <p>{cartItem?.quantity}</p>
                                <button
                                    className={`${
                                        cartItem?.quantity > 1
                                            ? "text-red"
                                            : "text-gray cursor-auto"
                                    } text-2xl`}
                                    onClick={() => removeFromCart(cartItem)}
                                >
                                    <AiOutlineMinusCircle />
                                </button>
                            </div>

                            <Image
                                src={urlFor(cartItem?.image[0]).url()}
                                alt="Item"
                                width={100}
                                height={100}
                            />

                            {/* Description */}
                            <div className="space-y-1">
                                <h3 className="text-blue font-semibold text-sm">
                                    {cartItem?.title}
                                </h3>
                                <p className="text-gray text-xs">
                                    ${cartItem?.price}x {cartItem?.quantity}
                                </p>
                                <h4 className="text-red font-semibold text-sm">
                                    ${cartItem?.price * cartItem?.quantity}
                                </h4>
                            </div>

                            <button
                                className="ml-auto hover:scale-x-110 hover:scale-y-110 text-lg hover:bg-white-smoke rounded-full"
                                onClick={() => deleteCartItem(cartItem)}
                            >
                                <GrFormClose />
                            </button>
                        </div>
                    ))}

                <div className="p-5">
                    <button className="text-white bg-red hover:bg-[#F43F5E] font-medium text-sm w-full rounded-md py-2">
                        Checkout Now ($${cartTotalPrice})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
