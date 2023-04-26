import React, { useRef, useState } from 'react'
import { categoryList, megaMenu, userMenu } from '../utils/constant'
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import {useStateContext} from '../context/ContextWrapper';
import Link from 'next/link';
import { useRouter } from "next/router";
import Login from './Login';
import { buttonAlert } from '../utils/buttonAlert';
import { gsap } from 'gsap';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';

const SecondaryNavBar = () => {
    const [showCategory, setShowCategory] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [showUserAccount, setShowUserAccount] = useState(false);
    const { userProfile, setDisplayLogin } = useStateContext();

    const router = useRouter();

    const secondaryNavBarRef = useRef(null);

    useEffect(() => {
      let gsapContext = gsap.context(() => {
          gsap.from('.categoriesContainer', {
            opacity: 0,
            x: -50,
            duration: 1.5
          });
          gsap.from('.megaMenuContainer', {
            opacity: 0,
            x: 50,
            duration: 1.5
          });
          gsap.from('.userAccountContainer', {
            opacity: 0,
            x: 100,
            duration: 1.5
          });
      }, secondaryNavBarRef);

      return () => gsapContext.revert();
    }, [])

    const IconList = ({icon, title, color, showRightIcon, width='90px'}) => {
        return (
        <div 
          className={`text-${color} w-[${width}] flex item-center justify-between cursor-pointer hover:text-red`}
          onClick={() => buttonAlert()}
        >
            <p className='flex items-center gap-2 text-md'>{icon} <span className='capitalize'>{title}</span></p> 
            <p className={showRightIcon ? '' : 'hidden'}><AiOutlineRight /></p>
        </div>
        )
    }


  return (
    <div className='w-full bg-white border-b-[1px] border-gray/10 shadow-md'>
      <div className='hidden lg:flex justify-between items-center px-4 py-4 bg-white max-w-[1300px] lg:px-0 m-auto'
          ref={secondaryNavBarRef}>
        <div className='relative w-[250px]'>
          <div 
            className='categoriesContainer bg-light-blue flex justify-between items-center rounded-md px-3 py-2 cursor-pointer'
            onClick={() => setShowCategory(prev => !prev)}
          >
            <p className='mr-3'><MdCategory /></p>
            <p className='mr-auto text-gray '>Categories</p>
            <p><AiOutlineDown /></p>
          </div>

          {/* Dropdown Categories */}
          <div className={`absolute w-[250px] left-0 top-full mt-1 p-3 flex flex-col bg-white gap-3
                           rounded-lg shadow-md transition ease-in-out duration-1000 
                           ${showCategory ? 'translate-y-0 opacity-100 pointer-events-auto z-50' : 'translate-y-[-10px] opacity-0 z-auto pointer-events-none'}`}>
              {categoryList.map((category) => (
                <IconList key={category.title} icon={category.icon} title={category.title} color={'blue'} showRightIcon={true}/>
              ))}
          </div>
          
        </div>
        
        <div className='hidden lg:flex items-center gap-6'>
        {/* Mega Menu */}
          <div className='megaMenuContainer relative'>
            <p 
              className='flex items-center cursor-pointer text-sm font-light gap-1 hover:text-red'
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}  
            >Mega Menu <span><AiOutlineDown /></span></p>
            {/* Dropdown Mega Menu */}
            <div 
              className={`cursor-pointer absolute w-[600px] left-[-400px] bg-white z-10 p-10 shadow-md rounded-md transition duration-500 ease-in-out ${showMegaMenu ? 'translate-y-0 opacity-100 z-20 pointer-events-auto' : 'translate-y-[-10px] opacity-0 z-auto pointer-events-none'}`}
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              <h3 className='mb-3 font-bold text-blue'>Men Fashion</h3>
              <div className='flex flex-wrap text-left gap-10 text-sm'>
                {megaMenu.map((item) => (
                  <IconList key={item.title} icon={item.icon} title={item.title} color={'gray'} showRightIcon={false} width={'100px'}/>
                ))}
              </div>
            </div>
          </div>
            
          {/* User Account Menu */}
          <div className='userAccountContainer relative'>
            <p 
              className='flex items-center cursor-pointer text-sm font-light gap-1 hover:text-red'
              onMouseEnter={() => setShowUserAccount(true)}
              onMouseLeave={() => setShowUserAccount(false)}
            >User Account <span><AiOutlineDown /></span></p>
            {/* Dropdown User Account Menu */}
            <div 
              className={`absolute p-8 bg-white w-[200px] rounded-md shadow-md left-[-100px] top-[20px] space-y-4 transition duration-500 ease-in-out ${showUserAccount ? 'translate-y-0 opacity-100 z-20 pointer-events-auto' : 'translate-y-[-10px] opacity-0 z-auto pointer-events-none'}`}
              onMouseEnter={() => setShowUserAccount(true)}
              onMouseLeave={() => setShowUserAccount(false)}
            >
                {userMenu.map((item) => (
                    <div className={`text-blue w-[90px}] flex item-center justify-between cursor-pointer hover:text-red`} key={item.title}>
                        <button 
                          className='flex items-center gap-2 text-md'
                          onClick={() => {
                            if (userProfile) router.push(`/profile/${userProfile?._id}`);
                            else setDisplayLogin(true);
                          }}  
                        >{item.icon} <span className='capitalize'>{item.title}</span></button> 
                        <button
                          onClick={() => {
                            if (userProfile) router.push(`/profile/${userProfile?._id}`);
                            else setDisplayLogin(true);
                          }}  
                        ><AiOutlineRight /></button>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondaryNavBar