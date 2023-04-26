import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { AiFillRightCircle, AiOutlineSearch } from 'react-icons/ai';
import { client, urlFor } from '../lib/client';
import Image from 'next/image';
import { AiOutlineCaretRight } from 'react-icons/ai';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Skeleton from './Skeleton';
import { useRadioGroup } from '@mui/material';
import { useRouter } from 'next/router';

const Search = ({ categories }) => {
  const [searchValue, setSearchValue] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    if (searchValue.trim().length === 0) {
        toast.error("Please search in the box!");
    }

    const searchProductQuery = `*[_type == "product" && title match "${searchValue}"]`;
    const fetchedProducts = await client.fetch(searchProductQuery);
    console.log(fetchedProducts);
    if (fetchedProducts?.length > 0) {
      setIsSearching(false);
      setSearchedProducts(fetchedProducts);
    } else {
      toast.error(`Can't find the product!`);
    }
    setSearchValue('');
  }

  return (
    <div className='relative'>
      <form
          className="relative h-[40px] rounded-full flex items-center bg-white shadow-md pl-4 border-gray border-[1px]"
          onSubmit={handleSubmit}
      >
          <button className="text-gray-500" type="submit">
              <AiOutlineSearch />
          </button>
          <input
              type="text"
              placeholder="Searching for..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              onFocus={() => {
                setOnSearch(true);
              }}
              onBlur={() => {
                setOnSearch(false);
                setIsSearching(true);
                setSearchedProducts();
              }}
              className="border-none outline-none focus:outline-none bg-none "
          />
          <select className="bg-light-blue h-full rounded-r-full ml-auto px-4 font-serif font-thin text-sm border-l-[1px] border-gray">
              <option>All Categories</option>
              {categories?.map((category) => (
                  <option key={category._id}>{category.title}</option>
              ))}
          </select>
      </form>

      <div 
          className={`${onSearch ? 'opacity-100 z-40' : 'opacity-0 z-auto'} transition duration-300 ease-in-out absolute w-full
                   bg-white shadow rounded-md p-4 pr-8`}
      >
        {isSearching && <Skeleton />}
        {searchedProducts?.length > 0 && searchedProducts.map((product) => (
          <div className='flex gap-2 items-center' key={product._id}>
            <Image
              src={urlFor(product.image[0]).url()}
              width={70}
              height={70}
            />
            <div>
              <h3 className='text-sm font-medium'>{product.title}</h3>
              <p className='text-gray text-xs '>{product.brand}</p>
            </div>

            <button 
              className='text-blue ml-auto text-lg hover:scale-x-105 hover:scale-y-105'
            >
               <AiFillRightCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search