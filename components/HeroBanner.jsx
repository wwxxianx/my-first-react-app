import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import {urlFor} from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const [Nike, Rolex] = heroBanner;

  const [showFirstBanner, setShowFirstBanner] = useState(true);
  const [showSecondBanner, setShowSecondBanner] = useState(false);

  const heroBannerRef = useRef(null);

  useEffect(() => {
    let gsapContext = gsap.context(() => {
      gsap.from('.Image', {
        rotate: 360,
        duration: 1.5
      });
      gsap.from('.Text', {
        y: -10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.5,
      })
    });

    return () => gsapContext.revert();
}, [])



  return (
      //wrapper
      <div className='w-full bg-white'>
        <div className="max-w-[1000px] m-auto p-4 md:px-10">
            {/* Content Slider*/}
            <div className="min-w-full m-auto overflow-x-hidden flex" ref={heroBannerRef}>
                {/* First Content */}
                <div className={`${showFirstBanner ? 'translate-x-0 opacity-100' : 'translate-x-[-100%] opacity-0'} transition duration-500 ease-in-out flex justify-center items-center flex-col md:flex-row lg:flex-row min-w-full`}>
                    {/* Description */}
                    <div className="Text space-y-5 flex-1">
                        <h3 className="Text text-5xl font-semibold font-sans capitalize">
                            {Nike.largeText}
                        </h3>
                        <p className="Text text-sm text-gray-500">{Nike.detail}</p>
                        <Link href={`/product`}>
                            <button className="Text px-8 py-2 text-white font-semibold text-md bg-red cursor-pointer rounded-md hover:bg-red-hover">
                                Shop Now
                            </button>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <img src={urlFor(Nike.image)} alt="The Nike" className='Image'/>
                    </div>
                </div>

                {/* Second Content */}
                <div className={`${showSecondBanner ? 'translate-x-[-100%] opacity-100' : 'translate-x-0 opacity-0'} transition duration-500 ease-in-out flex justify-center items-center flex-col md:flex-row lg:flex-row min-w-full`}>
                    {/* Description */}
                    <div className="space-y-5 flex-1">
                        <h3 className="text-5xl font-semibold font-sans capitalize">
                            {Rolex.largeText}
                        </h3>
                        <p className="text-sm text-gray-500">{Rolex.detail}</p>
                        <Link href={`/product/${Rolex.title}`}>
                            <button className="px-8 py-2 text-white font-semibold text-md bg-red cursor-pointer rounded-md hover:scale-x-110 hover:scale-y-110 transition duration-500">
                                Shop Now
                            </button>
                        </Link>
                    </div>

                    <div className="flex-1">
                        <img src={urlFor(Rolex.image)} alt="The Nike" />
                    </div>
                </div>
            </div>

            {/* Slide Button */}
            <div className="flex gap-2 justify-center items-center">
                <button 
                    className="bg-white flex justify-center items-center w-[20px] h-[20px] rounded-full border-[1px] border-blue hover:scale-x-110 hover:scale-y-110 transition duration-500 cursor-pointer"
                    onClick={() => {
                    setShowSecondBanner(false); 
                    setShowFirstBanner(true)}}
                    >
                    <span className={`${showFirstBanner ? 'bg-blue' : 'bg-white'} w-[10px] h-[10px] text-none rounded-full`}>
                        {" "}
                    </span>
                </button>
                <button 
                    className="bg-white flex justify-center items-center w-[20px] h-[20px] rounded-full border-[1px] border-blue hover:scale-x-110 hover:scale-y-110 transition duration-500 cursor-pointer"
                    onClick={() => {
                    setShowSecondBanner(true); 
                    setShowFirstBanner(false)}}
                    >
                    <span className={`${showSecondBanner ? 'bg-blue' : 'bg-white'} w-[10px] h-[10px] text-none rounded-full`}>
                        {" "}
                    </span>
                </button>
            </div>
        </div>
    </div>
  );
}

export default HeroBanner