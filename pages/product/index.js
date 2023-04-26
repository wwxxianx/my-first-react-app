import React, { useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BiFilter } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { categoryList } from "../../utils/constant";
import { buttonAlert } from "../../utils/buttonAlert";
import { AiFillCloseCircle, AiOutlineRight } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { client } from "../../lib/client";
import ProductCard from "../../components/ProductCard";
import toast from "react-hot-toast";

const Product = ({ products }) => {
    const [sortedProducts, setSortedProducts] = useState(products);
    const [view, setView] = useState("grid");
    const [displayFilter, setDisplayFilter] = useState(false);
    const [priceRange, setPriceRange] = useState({ from: 0, to: 999999 });
    const [selectedBrand, setSelectedBrand] = useState("rolex");
    const [selectedFilter, setSelectedFilter] = useState("");

    const IconList = ({ icon, title, color, showRightIcon = true }) => {
        return (
            <div
                className={`text-${color} flex item-center justify-between cursor-pointer hover:text-red`}
                onClick={() => buttonAlert()}
            >
                <p className="flex items-center gap-2 text-md">
                    {icon} <span className="capitalize">{title}</span>
                </p>
                <p className={showRightIcon ? "" : "hidden"}>
                    <AiOutlineRight />
                </p>
            </div>
        );
    };

    const handleFilterChange = (e) => {
        let filter = e.target.value;
        setSelectedFilter(filter);
        let productsSorted;
        if (filter === "Price Low to High") {
            productsSorted = [...sortedProducts].sort(
                (a, b) => a.price - b.price
            );
            setSortedProducts(productsSorted);
        } else if (filter === "Price High to Low") {
            productsSorted = [...sortedProducts].sort(
                (a, b) => b.price - a.price
            );
            setSortedProducts(productsSorted);
        } else {
            buttonAlert();
        }
    };

    const handlePriceRangeChange = () => {
        if (priceRange.to >= 0 && priceRange.from >= 0) {
            if (priceRange.to > priceRange.from) {
                let productSorted;
                productSorted = [...sortedProducts].filter(
                    (product) =>
                        product.price >= priceRange.from &&
                        product.price <= priceRange.to
                );
                setSortedProducts(productSorted);
            } else {
                toast.error("Please give a valid price range");
            }
        }
    };

    return (
        //Wrapper
        <div className="max-w-[1300px] m-auto px-5 lg:px-0 py-5 space-y-5">
            {/* Heading Container */}
            <div
                className="bg-white px-3 py-4 flex md:justify-end items-center gap-10 rounded-md shadow-md
                            "
            >
                <form className="relative">
                    <label htmlFor="sorting" className="text-gray text-sm">
                        Sort by:{" "}
                    </label>
                    <select
                        name="sorting"
                        className="border-gray/60 border-[1px] rounded-sm text-sm px-3 py-2
                                                    appearance-none cursor-pointer"
                        onChange={(e) => handleFilterChange(e)}
                        value={selectedFilter}
                    >
                        <option value="Relavance">Relavance</option>
                        <option value="Date">Date</option>
                        <option value="Price Low to High">
                            Price Low to High
                        </option>
                        <option value="Price High to Low">
                            Price High to Low
                        </option>
                    </select>
                    <button className="absolute text-gray right-[2%] top-[27%]">
                        <IoMdArrowDropdown />
                    </button>
                </form>
                {/* Display style */}
                <div className="flex items-center gap-3">
                    <p className="text-gray text-sm">View: </p>
                    <p
                        className={`${
                            view === "grid" ? "text-red" : "text-gray"
                        } cursor-pointer text-sm`}
                        onClick={() => setView("grid")}
                    >
                        <BsFillGrid3X3GapFill />
                    </p>
                    <p
                        className={`${
                            view === "list" ? "text-red" : "text-gray"
                        } cursor-pointer text-sm`}
                        onClick={() => setView("list")}
                    >
                        <FaList />
                    </p>
                    <p
                        className={`lg:hidden cursor-pointer text-gray text-lg`}
                        onClick={() => setDisplayFilter(true)}
                    >
                        <BiFilter />
                    </p>
                </div>
            </div>

            {/* Filter & Products Container */}
            <div className="flex gap-5">
                {/* Filter Container */}
                <div
                    className={`${
                        displayFilter
                            ? "fixed top-0 w-[100vw] h-[100vh] bg-black/20 z-40"
                            : "z-auto hidden"
                    }`}
                ></div>
                <div
                    className={`bg-white rounded-md shadow-md text-sm px-3 py-3 space-y-5
                            fixed top-0 left-0 w-[33vw] h-[100vh] ${
                                displayFilter
                                    ? "translate-x-0 z-50"
                                    : "translate-x-[-200%]"
                            }
                            transition duration-500 ease-in-out
                            lg:translate-x-0 lg:relative lg:min-w-[300px] lg:flex-1 lg:h-auto`}
                >
                    <button
                        className="lg:hidden text-lg cursor-pointer"
                        onClick={() => {
                            setDisplayFilter(false);
                        }}
                    >
                        <AiFillCloseCircle />
                    </button>
                    {/* Categories */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-md font-medium font-serif">
                            Categories
                        </h3>
                        {categoryList.map((item) => (
                            <IconList
                                icon={item.icon}
                                title={item.title}
                                color="gray"
                                key={item.title}
                            />
                        ))}
                    </div>

                    <hr className="text-gray/30" />

                    {/* Price Range */}
                    <form htmlFor="price_range" className="space-y-2">
                        <label className="text-md font-medium font-serif">
                            Price Range
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                placeholder="0"
                                value={priceRange.from}
                                onChange={(e) =>
                                    setPriceRange({
                                        ...priceRange,
                                        from: e.target.value,
                                    })
                                }
                                className="px-2 py-2 border-[1px] border-gray/60 rounded-sm w-[50%]"
                            />
                            <p>-</p>
                            <input
                                type="number"
                                placeholder="1000"
                                value={priceRange.to}
                                onChange={(e) =>
                                    setPriceRange({
                                        ...priceRange,
                                        to: e.target.value,
                                    })
                                }
                                className="px-2 py-2 border-[1px] border-gray/60 rounded-sm w-[50%]"
                            />
                        </div>
                        <button
                            type="button"
                            className="text-blue font-medium text-xs border-[2px] border-blue px-4 py-1 rounded-md hover:text-white hover:bg-blue"
                            onClick={() => handlePriceRangeChange()}
                        >
                            Apply
                        </button>
                    </form>

                    <hr className="text-gray/30" />

                    {/* Brands */}
                    <div className="space-y-2">
                        <h3 className="font-serif text-sm font-medium">
                            Brands
                        </h3>
                        <div
                            className="cursor-pointer flex gap-3 items-center"
                            onClick={() => {
                                setSelectedBrand("rolex");
                                buttonAlert();
                            }}
                        >
                            <p
                                className={`${
                                    selectedBrand === "rolex"
                                        ? "bg-blue text-white"
                                        : "bg-white text-white"
                                } flex items-center 
                                    justify-center border-[2px] w-[15px] h-[15px] 
                                    border-black rounded-sm`}
                            >
                                <TiTick />
                            </p>
                            <span>Rolex</span>
                        </div>
                        <div
                            className="cursor-pointer flex gap-3 items-center"
                            onClick={() => {
                                setSelectedBrand("apple");
                                buttonAlert();
                            }}
                        >
                            <p
                                className={`${
                                    selectedBrand === "apple"
                                        ? "bg-blue text-white"
                                        : "bg-white text-white"
                                } flex items-center 
                                    justify-center border-[2px] w-[15px] h-[15px] 
                                    border-black rounded-sm`}
                            >
                                <TiTick />
                            </p>
                            <span>Apple</span>
                        </div>
                    </div>
                </div>

                {/* Products Container */}
                <div className="w-full space-y-5 tablet:space-y-0 tablet:flex flex-wrap justify-between gap-5">
                    {sortedProducts &&
                        sortedProducts.map((product) => (
                            <ProductCard
                                product={product}
                                wishListSettings=""
                                mainPageSettings="tablet:flex-1 tablet:min-w-[300px] md:max-w-[300px] lg:max-w-[320px]"
                                key={product._id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Product;

export const getServerSideProps = async (context) => {
    const productsQuery = '*[_type == "product"]';
    const products = await client.fetch(productsQuery);

    return {
        props: { products },
    };
};
