import gsap from 'gsap';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const BrandFeature = () => {
    gsap.registerPlugin(ScrollTrigger);

    const container = useRef(null);

    useEffect(() => {
        let gsapContext = gsap.context(() => {
          gsap.fromTo('.feature', {
            opacity: 0,
            x: -250,
          }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: '.feature',
                start: "top center",
                end: 'top top',
                scrub: 1
              },
          });
        }, container);

        return () => gsapContext.revert();
    }, [])
    
    return (
        //Wrapepr
        <div className='max-w-[1300px] m-auto px-5 lg:px-0'>
            {/* Container */}
            <div 
                className='px-10 py-12 space-y-4 rounded-md shadow-lg bg-white
                            tablet:space-y-0 gap-2 tablet:flex flex-wrap lg:flex-nowrap'
                ref={container}                
            >
                <div className='feature flex items-center gap-3 flex-1 tablet:min-w-[270px] tablet:justify-center
                                tablet:border-r-[1px] border-gray/20 md:min-w-[350px] lg:min-w-0'>
                    <Image
                        src='/delivery.png'
                        alt='icon'
                        width={50}
                        height={50}
                    />
                    <div>
                        <h3 className='text-lg lg:text-xl font-semibold'>Fast delivery</h3>
                        <p className='text-sm lg:text-md text-gray mt-[-5px]'>Start from $15</p>
                    </div>
                </div>
                
                <div className='feature flex items-center gap-3 flex-1 tablet:min-w-[270px] tablet:justify-center md:min-w-[350px]
                                lg:min-w-0 lg:border-r-[1px] border-gray/20'>
                    <Image
                        src='/stopwatch.png'
                        alt='icon'
                        width={50}
                        height={50}
                    />
                    <div>
                        <h3 className='text-lg lg:text-xl font-semibold'>365 days</h3>
                        <p className='text-sm lg:text-md text-gray mt-[-5px]'>For free return</p>
                    </div>
                </div>

                <div className='feature flex items-center gap-3 flex-1 tablet:min-w-[270px] tablet:justify-center
                                tablet:border-r-[1px] border-gray/20 md:min-w-[350px] lg:min-w-0'>
                    <Image
                        src='/save-money.png'
                        alt='icon'
                        width={50}
                        height={50}
                    />
                    <div>
                        <h3 className='text-lg lg:text-xl font-semibold'>Money Guarantee</h3>
                        <p className='text-sm lg:text-md text-gray mt-[-5px]'>10 days back</p>
                    </div>
                </div>

                <div className='feature flex items-center gap-3 flex-1 tablet:min-w-[270px] tablet:justify-center md:min-w-[350px]
                                lg:min-w-0'>
                    <Image
                        src='/operation.png'
                        alt='icon'
                        width={50}
                        height={50}
                    />
                    <div>
                        <h3 className='text-lg lg:text-xl font-semibold'>Payment</h3>
                        <p className='text-sm lg:text-md text-gray mt-[-5px]'>Secure system</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BrandFeature;