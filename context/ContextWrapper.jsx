import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from 'react-icons/fa';
import { TbShoppingCartOff } from "react-icons/tb";
import { AiTwotoneDelete } from 'react-icons/ai';

const Context = React.createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotalQuantities, setCartTotalQuantities] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [displayLogin, setDisplayLogin] = useState(false);
    const [userProfile, setUserProfile] = useState();
    const [navBarCategories, setNavBarCategories] = useState();
    const [activeSideBar, setActiveSideBar] = useState('profile');
    const [allUsers, setAllUsers] = useState();

    const updateUserProfile = (newUserProfile) => {
        setUserProfile(newUserProfile);
        
        if (typeof localStorage !== undefined) {
            localStorage.setItem('user', newUserProfile)
        }
    }

    const addToCart = (product, qty) => {
        //Check if item already in cart
        //add the quantity to the existing item
        //Else
        //Append into cart
        const foundItem = cartItems.find((cartItem) => cartItem._id === product._id);
        
        if (foundItem) {
            let updatedItem = {...foundItem, quantity: foundItem?.quantity + qty };
            // let orgItem = cartItems.filter((cartItem) => cartItem._id !== product._id);
            // setCartItems([...orgItem, updatedItem]);
            let arrangedCart = arrangeCart(updatedItem);
            setCartItems(arrangedCart);
        } else {
            let newItem = {
                ...product,
                quantity: qty,
            };
            setCartItems([...cartItems, newItem]);
        }
        setCartTotalQuantities(prev => prev+qty);
        setCartTotalPrice(prev => prev + product.price * qty);
        toast(() => (
            <div className="flex items-center gap-1">
                <p className="text-red"><FaShoppingCart /></p>
                <p className="text-sm font-medium"><span className="text-red">{product.title.toUpperCase()}</span> added to cart!</p>
            </div>
        ))
    }

    const arrangeCart = (newItem) => {
        let afterArrange = cartItems.map((cartItem) => {
            if (cartItem._id === newItem._id) return newItem;
            return cartItem;
        })
        return afterArrange;
    }

    const removeFromCart = (removeproduct) => {
        let updatedItem = cartItems.map((cartItem) => {
            if (cartItem._id === removeproduct._id) {
                if (cartItem.quantity > 1) {
                    setCartTotalQuantities((prev) => prev - 1);
                    setCartTotalPrice((prev) => prev - removeproduct.price);
                    toast(() => (
                        <div className="flex items-center gap-1">
                            <p><TbShoppingCartOff /></p>
                            <p className="text-sm font-medium"><span className="text-red">{removeproduct.title.toUpperCase()}</span> remove from cart!</p>
                        </div>
                    ))
                    return {
                        ...removeproduct,
                        quantity: removeproduct.quantity - 1,
                    };
                } else {
                    return cartItem;
                }
            } else {
                return cartItem;
            }
        })

        setCartItems(updatedItem);
    }

    const deleteCartItem = (product) => {
        let updatedCart = cartItems.filter((cartItem) => cartItem._id !== product._id);
        setCartItems(updatedCart);
        setCartTotalQuantities(prev => prev - product.quantity);
        setCartTotalPrice(prev => prev - product.pricec * product.quantity);
        toast(() => (
            <div className="flex items-center gap-1">
                <p className="text-red"><AiTwotoneDelete /></p>
                <p className="text-sm font-medium"><span className="text-red">{product.title.toUpperCase()}</span> deleted!</p>
            </div>
        ))
    }
    
    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartTotalQuantities,
                addToCart,
                cartItems,
                removeFromCart,
                deleteCartItem,
                cartTotalPrice,
                displayLogin,
                setDisplayLogin,
                userProfile,
                setUserProfile,
                navBarCategories,
                setNavBarCategories,
                updateUserProfile,
                activeSideBar,
                setActiveSideBar,
                setAllUsers,
                allUsers,
            }}
        >
            {children}
        </Context.Provider>
    );
}

export const useStateContext = () => useContext(Context);
