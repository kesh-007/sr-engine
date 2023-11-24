"use client"
import React, { useEffect, useState } from 'react';
import { HeaderComponent } from './header';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import DarkModeToggle from './DarkModetoggle';

const Navbar = () => {
  const { data: session, status } = useSession();
  const [_status, _setstatus] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => Boolean(localStorage.getItem('darkMode')));

  useEffect(() => {
    if (status === "authenticated") {
      _setstatus(true);
    }
  }, [status]);

  
  

  function sendMode(mode:boolean)
  {
    setIsDarkMode(mode)
  }

  return (
    <div>
      <div>
        <title>Dashboard || SR Engine</title>
        <div className="flex justify-between p-4 dark:text-white h-20">
          <p className="text-2xl font-bold">
            <Image
              src={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
              height={20}
              width={60}
              className="w-[6rem] h-[3rem] object-fill"
              style={{ objectFit: 'fill' }}
              alt="logo"
            />
          </p>
          {_status && <HeaderComponent />}
          <p className='max-md:hidden'>
            <DarkModeToggle sendMode={sendMode} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
