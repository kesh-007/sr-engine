"use client"

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

const links = ['2024', '2025', '2026', '2027']

const Filters = () => {
  const [active, setActive] = useState('');
  const searchParms = useSearchParams();
  const router = useRouter();
function handleFilter(link:string)
{
  if (link === "CLEAR")
  setActive('')
        
  else
  setActive(link)
    console.log(link)

}
  

  return (
    <ul className="text-center px-[1rem] max-md:text-sm">
      {links.map((link) => (
        <button
          key={link}
          onClick={() => handleFilter(link)}
          className={`${
            active === link ?"gradient_blue-purple" : ""
          } whitespace-nowrap rounded-lg px-8 py-2.5 capitalize`
          
        }
        >
          {link}
        </button>
      ))}
       <button
          key={'clear'}
          onClick={() => handleFilter('CLEAR')}
          className={" hover:text-red-400 text-sm"}
        >
          {"CLEAR"}
        </button>
    </ul>
  )
}

export default Filters