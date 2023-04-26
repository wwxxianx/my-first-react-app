import { BrandFeature, HeroBanner, TopCategoryMarquee, ProductCard, SectionHeading } from "../components";
import { useEffect, useRef } from "react";
import { client, urlFor } from "../lib/client";
import Image from "next/image";
import Link from "next/link";
import { useStateContext } from "../context/ContextWrapper";
import Slider from 'react-slick';
import { FcShop } from 'react-icons/fc';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';


export default function Home({ categories, heroBanner, products, topCategories, newArrivals }) {

    const { setUserProfile, setNavBarCategories } = useStateContext();

    const sliderRef = useRef(null);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    useEffect(() => {
        setNavBarCategories(categories);
        if (typeof localStorage !== undefined) {
            let loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
                let user = JSON.parse(loggedInUser);
                setUserProfile(user);
            }
        }
    }, []);

    return (
        <div className="space-y-[100px]">
            <HeroBanner heroBanner={heroBanner} />

            <BrandFeature />

            {/* Flesh deals */}
            {/* <ScrollReveal> */}
                <div className="w-full px-4">
                    {/* Container */}
                    <div className="relative w-full max-w-[1300px] px-5 lg:px-0 m-auto">
                        <SectionHeading
                            icon={<AiFillThunderbolt />}
                            title="Flesh deals"
                        />

                        <div className="flex max-w-[1300px]">
                            <Slider
                                {...sliderSettings}
                                className="max-w-[1300px] w-full"
                                ref={sliderRef}
                            >
                                {products.map((product) => (
                                    <ProductCard
                                        product={product}
                                        key={product._id}
                                        mainPageSettings="w-[250px] tablet:w-[280px] md:w-[300px] lg:w-[300px] xl:w-[350px]"
                                        wishListSettings=""
                                    />
                                ))}
                            </Slider>
                        </div>

                        <button
                            className="absolute top-[53%] left-[-10px] text-4xl text-blue"
                            onClick={() => sliderRef.current.slickPrev()}
                        >
                            <BsFillArrowLeftCircleFill />
                        </button>
                        <button
                            className="absolute top-[53%] right-0 text-4xl text-blue"
                            onClick={() => sliderRef.current.slickNext()}
                        >
                            <BsFillArrowRightCircleFill />
                        </button>
                    </div>
                </div>
            {/* </ScrollReveal> */}

            <TopCategoryMarquee topCategories={topCategories} />

            {/* New Arrivals */}
            <div className="w-full max-w-[1300px] m-auto px-5 lg:px-0">
                <SectionHeading icon={<FcShop />} title="New Arrival" />
                <div className="flex flex-wrap justify-between bg-white roundeed-lg shadow-md">
                    {newArrivals.map((item) => (
                        <Link href={`/product/${item.slug.current}`} key={`${item._id}`}>
                            <div className="cursor-pointer rounded-md text-center space-y-1 min-w-[200px] flex-1 p-4 bg-white">
                                <Image
                                    src={urlFor(item.image[0]).url()}
                                    alt="product image"
                                    width={150}
                                    height={150}
                                    layout='responsive'
                                    className="rounded-md bg-[#E3E9EF] transition duration-300 ease-in-out hover:scale-110"
                                />
                                <h2 className="text-sm font-medium">{item.title}</h2>
                                <p className="text-red text-md font-medium">${item.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const productsQuery = '*[_type == "product"]';
    const products = await client.fetch(productsQuery);
    
    const topCategoryQuery = '*[_type == "topCategory"]';
    const topCategories = await client.fetch(topCategoryQuery);
    
    const categoryQuery = '*[_type == "category"]';
    const categories = await client.fetch(categoryQuery);
    
    const heroBannerQuery = `*[_type == "mainBanner"] | order(_createdAt asc)`;
    const heroBanner = await client.fetch(heroBannerQuery);

    const newArrivalQuery = '*[_type == "product"][0...6] | order(_createdAt desc)';
    const newArrivals = await client.fetch(newArrivalQuery);

    return {
        props: {
            categories,
            heroBanner,
            products,
            topCategories,
            newArrivals,
        },
    };
};
