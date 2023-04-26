import React, { useLayoutEffect, useRef, useState } from 'react'
import { BsPerson,BsHandbag } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineMenu, AiOutlineToTop } from "react-icons/ai";
import {useStateContext} from '../context/ContextWrapper';
import { Avatar } from "@mui/material";
import Cart from './Cart';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { client } from '../lib/client';
import ProductCard from './ProductCard';
import Search from './Search';
import {gsap} from 'gsap';
import { useEffect } from 'react';

const PrimaryNavBar = ({categories}) => {
    const [search, setSearch] = useState('');
    const [searchedProducts, setSearchedProducts] = useState([]);
    const { showCart, setShowCart, cartTotalQuantities, setDisplayLogin, userProfile } = useStateContext();

    const primaryNavBarRef = useRef(null);

    useEffect(() => {
        let gsapContext = gsap.context(() => {
          gsap.from(primaryNavBarRef.current, {
            opacity: 0,
            y: -50,
            duration: 1.5,
          });
        });

        return () => gsapContext.revert();
    }, [])

    return (
      <div className='w-full bg-white shadow-md' ref={primaryNavBarRef}>
        <div className="max-w-[1300px] lg:px-0 m-auto flex justify-between px-4 py-4">
            <Link href='/'>
              <div className='cursor-pointer'>
                  <img src="/logo2.svg" alt="Logo" />
              </div>
            </Link>

            {/* Input field */}
            <Search categories={categories}/>

            <div className='md:flex gap-3'>
              {userProfile ? (
                <div className='hidden md:block'>
                  <Avatar 
                    src={userProfile.picture}
                    alt='Profile picture'
                    className='cursor-pointer'
                    onClick={() => setDisplayLogin(true)}
                  />
                </div>
              ) : (
                <button 
                  className='hidden md:block p-2 rounded-full text-gray bg-light-blue cursor-pointer'
                  onClick={() => setDisplayLogin(true)}
                >
                  <BsPerson />
                </button>
              )}
              <div 
                className='hidden md:block relative p-2 rounded-full text-gray bg-light-blue cursor-pointer'
                onClick={() => setShowCart(prev => !prev)}
              >
                  <BsHandbag />
                  <div className='absolute top-[-10px] right-[-10px] w-[20px] flex items-center justify-center aspect-square text-white bg-red rounded-full text-xs '>{cartTotalQuantities}</div>
              </div>

              <div className='lg:hidden'>
                <p className='p-2 rounded-full text-gray bg-light-blue lg:hidden'><AiOutlineMenu /></p>
              </div>
            </div>

        </div>

        {showCart && <Cart />}
      </div>
    )
}

export default PrimaryNavBar