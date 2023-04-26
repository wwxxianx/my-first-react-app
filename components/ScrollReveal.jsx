import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ children }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        async function animate() {
            if (sectionRef.current) {
                const scrollReveal = (await import("scrollreveal")).default;
                scrollReveal().reveal(sectionRef.current, {
                    delay: 500,
                    reset: true,
                });
            }
        }
        animate();
    }, []);

    return <section ref={sectionRef}>{children}</section>;
}

export default ScrollReveal