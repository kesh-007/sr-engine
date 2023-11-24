"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { Input } from '@ui/components/ui/input';
import {AiOutlineSearch} from 'react-icons/ai'

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [search, setSearch] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = '';

    }, 300)
  
    return () => clearTimeout(delayDebounceFn)
  }, [search])
  

  return (
    <form className='flex-center mx-auto mt-10 w-full sm:-mt-10 sm:px-5'>
      <label className="flex-center relative w-full max-w-3xl">
        <AiOutlineSearch  className='absolute top-4 left-2'/>

        <Input 
          className="base-regular h-fit border-0  py-3 pl-10 pr-4 border"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </form>

  )
}

export default SearchForm