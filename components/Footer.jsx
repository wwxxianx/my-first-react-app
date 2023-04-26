import React from 'react'
import { buttonAlert } from '../utils/buttonAlert';
import Image from 'next/image';
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { CgMail } from 'react-icons/cg';

const Footer = () => {
  return (
      //Wrapper
      <div className="flex flex-col lg:flex-row lg:px-5 max-w-[1300px] text-white text-left mx-auto px-10 md:pb-[150px] pt-20">
          {/* Logo & About us */}
          <div className="flex-1 flex gap-10">
              {/* Logo */}
              <div className='flex-1'>
                  <img src="/logo.svg" alt="Logo" className='my-3'/>
                  <p className='mb-3 text-sm text-white/70'>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Auctor libero id et, in gravida. Sit diam duis mauris
                      nulla cursus. Erat et lectus vel ut sollicitudin elit at
                      amet.
                  </p>
                  {/* Download Button */}
                  <div className='flex gap-3'>
                    <div 
                      className='cursor-pointer w-[130px] flex items-center justify-center gap-2 p-2 bg-[#0C2A4D] rounded-md'
                      onClick={() => buttonAlert()}  
                    >
                        <Image 
                          src='/google-play.png' 
                          alt='Google Play'
                          width={25}
                          height={25}
                        />
                      <div>
                        <p className='text-xs font-medium'>Get it on</p>
                        <p className='mt-[-2px] text-xs font-bold'>Google Play</p>
                      </div>
                    </div>
                    <div 
                      className='cursor-pointer w-[130px] items-center justify-center flex gap-2 p-2 bg-[#0C2A4D] rounded-md '
                      onClick={() => buttonAlert()}   
                    >
                        <Image 
                          src='/app-store.png' 
                          alt='App Store'
                          width={20}
                          height={20}
                        />
                      <div>
                        <p className='text-xs font-medium'>Get it on</p>
                        <p className='mt-[-2px] text-xs font-bold'>Google Play</p>
                      </div>
                    </div>
                  </div>
              </div>

              {/* About us */}
              <div className='flex-1'>
                <h3 className='text-2xl font-semibold my-3'>About Us</h3>
                <ul className='text-sm md:text-md text-white/70 space-y-2'>
                  <li><p className='cursor-pointer hover:text-white'>Careers</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Our Stores</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Our Cares</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Terms & Conditions</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Privacy Policy</p></li>
                </ul>
              </div>
          </div>

          {/* Customer Care & Contact Us */}
          <div className="flex flex-1 gap-10">
            {/* Customer Care */}
            <div className='flex-1'>
                <h3 className='text-2xl font-semibold my-3'>About Us</h3>
                <ul className='text-sm md:text-md text-white/70 space-y-2'>
                  <li><p className='cursor-pointer hover:text-white'>Help Center</p></li>
                  <li><p className='cursor-pointer hover:text-white'>How to Buy</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Track your Order</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Corporate & Bulk Purchasing</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Returns & Refunds</p></li>
                </ul>
              </div>

            {/* Contact Us */}
            <div className='flex-1'>
                <h3 className='text-2xl font-semibold my-3'>About Us</h3>
                <ul className='text-sm md:text-md text-white/70 space-y-2'>
                  <li><p className='cursor-pointer hover:text-white'>70 Washington Square South, New York, NY 10012, United States</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Email: uilib.help@gmail.com</p></li>
                  <li><p className='cursor-pointer hover:text-white'>Phone: +1 1123 456 780</p></li>
                </ul>

                <div className='cursor-pointer flex gap-2 mt-3' onClick={() => buttonAlert()}>
                  <p><FaFacebookF /></p>
                  <p><AiOutlineTwitter /></p>
                  <p><AiOutlineInstagram /></p>
                  <p><AiOutlineYoutube /></p>
                  <p><CgMail /></p>
                </div>
              </div>
          </div>
      </div>
  );
}

export default Footer