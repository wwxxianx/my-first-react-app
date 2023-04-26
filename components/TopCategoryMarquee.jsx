import Link from "next/link";
import React, { useRef } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import SectionHeading from "./SectionHeading";
import Slider from "react-slick";
import { client, urlFor } from "../lib/client";

const TopCategoryMarquee = ({ topCategories }) => {

  const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      centerMode: true,
      responsive: [
          {
              breakpoint: 1380,
              settings: {
                  slidesToShow: 3,
              },
          },
          {
              breakpoint: 765,
              settings: {
                  slidesToShow: 2,
              },
          },
      ],
  };

  return (
        <div className="relative max-w-[1300px] px-5 m-auto lg:px-0">
            {/* Heading */}
            <SectionHeading icon={<MdCategory />} title="Top Categories" />

              <Slider 
                {...sliderSettings}
                className='max-w-[1300px] m-auto'
              >
                  {topCategories?.map((category) => (
                    <div 
                      className="cursor-pointer max-w-[350px] bg-white rounded-md p-4 shadow-sm"  
                      key={category.title}
                    >
                      <div className="relative rounded-md">
                        <img src={urlFor(category.image)} className='rounded-md'/>
                        <div className="absolute top-[10px] w-full flex justify-between px-4">
                          <h3 className="font-semibold text-xs text-white bg-blue rounded-full px-4 py-1">{category.rightText}</h3>
                          <p className="text-blue text-xs font-semibold bg-gray/30 px-4 py-1 rounded-full ">{category.leftText}</p>
                        </div>

                      </div>
                    </div>
                  ))}
              </Slider>
        </div>
    );
};

export default TopCategoryMarquee;
