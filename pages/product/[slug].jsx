import React, { useRef, useState } from 'react'
import { client, urlFor } from '../../lib/client';
import Image from 'next/image';
import Slider from "react-slick";
import { useStateContext } from '../../context/ContextWrapper';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiCommentX } from 'react-icons/bi';
import { Avatar } from '@mui/material';
import Review from '../../components/Review';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductDetail = ({ currentProduct, allUsers }) => {
    const [product, setProduct] = useState(currentProduct);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [activeTag, setActiveTag] = useState("review");
    const [reviewInput, setReviewInput] = useState("");

    //state context
    const { addToCart, setAllUsers, userProfile } = useStateContext();

    //Fake carousel Image
    let carouselImage = [];
    for (let i = 0; i < 3; i++) {
        carouselImage.push(product.image[0]);
    }

    const sliderRef = useRef(null);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
    };

    const changeCarousel = (index) => {
        if (index < carouselIndex) {
            sliderRef.current.slickPrev();
        } else if (index > carouselIndex) {
            sliderRef.current.slickNext();
        }
        setCarouselIndex(index);
    };

    useEffect(() => {
        setAllUsers(allUsers);
    }, [setAllUsers]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reviewInput && userProfile) {
            const response = await axios.post('http://localhost:3000/api/review', {
                userId: userProfile._id,
                productId: product._id,
                review: reviewInput
            });
            setProduct(response.data);
            setReviewInput('');
            toast.success('Review Submitted!')
        }

        if (!userProfile) toast.error('Please Login to review!');
        if (!reviewInput) toast.error('Please leave your review in the box!') 
    };

    return (
        <div className="max-w-[1300px] m-auto px-5 lg:px-0">
            {/* Product Container */}
            <div className="py-5 space-y-5 md:flex md:space-y-0 gap-5 justify-center">
                {/* Image Container */}
                <div className="bg-white md:min-w-[400px] flex flex-col items-center pb-10 rounded-md shadow-md">
                    <Slider
                        {...sliderSettings}
                        className="w-[300px]"
                        ref={sliderRef}
                    >
                        {carouselImage.map((img) => (
                            <div key={img._id}>
                                <Image
                                    src={urlFor(img).url()}
                                    width={200}
                                    height={200}
                                    layout="fixed"
                                />
                            </div>
                        ))}
                    </Slider>
                    {/* small Image carousel */}
                    <div className="flex gap-2">
                        {carouselImage.map((img, idx) => (
                            <div
                                key={idx}
                                className={`cursor-pointer border-[1px] border-gray/30 rounded-md flex items-center justify-center`}
                                onClick={() => changeCarousel(idx)}
                            >
                                <Image
                                    src={urlFor(img).url()}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desc container */}
                <div className="space-y-1">
                    <h1 className="text-blue text-2xl lg:text-4xl font-semibold">
                        {product.title}
                    </h1>
                    <p className="text-gray text-md">
                        Brand:{" "}
                        <span className="text-black font-medium">
                            {product.brand}
                        </span>
                    </p>
                    <p className="text-md text-gray">{product.detail}</p>
                    <div className="flex items-center text-lg">
                        <p className="text-gray textx-md">Rated: </p>
                        <div className="flex items-center ml-1 text-[#FAAF00]">
                            <p>
                                <AiFillStar />
                            </p>
                            <p>
                                <AiFillStar />
                            </p>
                            <p>
                                <AiFillStar />
                            </p>
                            <p>
                                <AiFillStar />
                            </p>
                            <p>
                                <AiFillStar />
                            </p>
                            <p className="text-gray">
                                <AiOutlineStar />
                            </p>
                        </div>
                    </div>
                    <p className="text-red text-lg lg:text-xl font-semibold">
                        ${product.price}
                    </p>
                    <p className="text-blue lg:text-sm">Stock Available</p>
                    <button
                        className="bg-red px-5 py-2 text-white capitalize font-medium text-sm rounded-md shadow-sm
                                    hover:bg-red-hover"
                        onClick={() => addToCart(product, 1)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            {/* Review Container*/}
            <div>
                <div className="flex gap-5">
                    <p
                        className={`cursor-pointer ${
                            activeTag === "review"
                                ? "text-red border-b-[2px] border-red"
                                : "text-gray"
                        }
                                 text-sm font-medium py-1 px-4`}
                        onClick={() => setActiveTag("review")}
                    >
                        Review
                    </p>
                    <p
                        className={`cursor-pointer ${
                            activeTag === "comment"
                                ? "text-red border-b-[2px] border-red"
                                : "text-gray"
                        } text-sm font-medium py-1 px-4`}
                        onClick={() => setActiveTag("comment")}
                    >
                        Leave a review
                    </p>
                </div>

                <hr className="mb-6 text-gray/20" />

                {activeTag === "review" && allUsers?.length && (
                    <div>
                        {product?.clientReview?.length ? (
                            <div>
                                {product.clientReview.map((review) => (
                                    <div key={review._id}>
                                        {console.log(
                                            "review in Review component: ",
                                            review
                                        )}
                                        <Review review={review} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='text-center space-y-2 pb-10 pt-4'>
                                <div className='flex gap-2 items-center justify-center text-2xl '>
                                    <p className='text-4xl'><BiCommentX /></p>
                                    <p className='text-gray font-medium '>No customer leaved a reiview yet😢</p>
                                </div>
                                <button 
                                    className='text-white font-medium text-sm bg-red px-5 py-2 rounded-md
                                                hover:bg-red-hover'
                                    onClick={() => setActiveTag('comment')}
                                >Leave a review</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTag === "comment" && (
                    <div className='space-y-3'>
                        <p className='text-xl font-medium'>Write a Review for this product</p>
                        <form
                            htmlFor="review"
                            className="flex flex-col gap-2"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <label className='text-md'>
                                Your Review{" "}
                                <span className="font-medium text-red">*</span>
                            </label>
                            <input
                                placeholder="Write a review here..."
                                type="text"
                                className="border-[1px] border-gray focus:border-red focus:outline-none  rounded-md px-3 pt-2 pb-[160px] bg-light-blue"
                                value={reviewInput}
                                onChange={(e) => setReviewInput(e.target.value)}
                            />
                            <button
                                type="submit"
                                className={`${
                                    reviewInput
                                        ? "bg-red text-white hover:bg-red-hover"
                                        : "text-black/30 bg-gray/30 cursor-not-allowed"
                                } mr-auto px-3 py-2 text-sm font-medium rounded-sm mt-2`}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;

export const getStaticPaths = async () => {
    const slugQuery = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const productsSlug = await client.fetch(slugQuery);
    const paths = productsSlug.map((product) => ({
        params: { slug: product.slug.current }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async (context) => {
    let slug = context.params.slug;
    const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
    const currentProduct = await client.fetch(productQuery);

    const userQuery = '*[_type == "user"]';
    const allUsers = await client.fetch(userQuery);

    return {
        props: { currentProduct, allUsers },
    };
}