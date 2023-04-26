import gsap from 'gsap';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react'
import { AiFillCaretRight } from 'react-icons/ai';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const SectionHeading = ({icon, title}) => {
    gsap.registerPlugin(ScrollTrigger);

    const container = useRef(null);

    useEffect(() => {
        let gsapContext = gsap.context(() => {
          gsap.fromTo('.leftText', {
            opacity: 0,
            x: -250,
          }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: '.leftText',
                start: "top bottom",
                end: 'top center',
                scrub: 1
              },
          });
          gsap.fromTo('.rightText', {
            opacity: 0,
            x: 250,
          }, {
            opacity: 1,
            x: 0,
            scrollTrigger: {
                trigger: '.rightText',
                start: "top bottom",
                end: 'top center',
                scrub: 1
              },
          });
        }, container);

        return () => gsapContext.revert();
    }, [])

  return (
      <div className="flex justify-between my-5" ref={container}>
          <div className="leftText flex gap-1 items-center text-2xl">
              <p className="text-red">
                  {icon}
              </p>
              <p className="text-blue font-bold font-serif">{title}</p>
          </div>

          <Link href="/product">
              <p className="rightText flex items-center text-gray gap-1 text-sm cursor-pointer hover:text-blue">
                  View all{" "}
                  <span>
                      <AiFillCaretRight />
                  </span>
              </p>
          </Link>
      </div>
  );
}

export default SectionHeading