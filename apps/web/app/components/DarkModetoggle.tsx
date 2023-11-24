"use client"
import React, { useState, useEffect } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const DarkModeToggle = ({sendMode}) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(isDarkMode);
      toggleDarkMode(isDarkMode);
    }, []);
  
    const toggleDarkMode = (isEnabled) => {
      if (isEnabled) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    };
  
    const handleToggle = () => {
      const isEnabled = !darkMode;

      setDarkMode(isEnabled);
      toggleDarkMode(isEnabled);
      sendMode(isEnabled)
    };
  
  
  return (
    <button onClick={handleToggle} className='dark:text-white border-2 rounded-sm p-2'>
      {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
    </button>
  );
};

export default DarkModeToggle;
