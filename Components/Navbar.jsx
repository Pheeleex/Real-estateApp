'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Menu } from 'lucide-react';

const NavBar = () => {
  const [nav, setnav] = useState(false)
  const toggleNav = () =>{
    setnav(prev => !prev)
  }

  return (
    <nav className="nav flex justify-between 
      items-center uppercase sticky top-0 z-50 w-full">
      <div className="flex justify-center 
        items-center red_text capitalize gap-3">
        <Home color= '#880808' size={50} />
        <Link href="/" className='text-xl lg:text-3xl font-bold'>
            Oyster Properties
        </Link>
      </div>
      <div className='sm:block md:hidden lg:hidden cursor-pointer'>
        <Menu
          onClick={toggleNav}
          color= '#880808' 
          size={40}
        />
         </div>
        <div className={`nav_links_list ${nav? 'md' : ''} cursor-pointer`}>
          <ul className="flex flex-col md:flex-row md:items-center gap-4">
            <li className="mb-4 md:mb-0 sm:mr-0 md:mr-8">
              <Link href="/" className="nav_links">
                  Home
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/About" className="nav_links">
                  About
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/Contact" className="nav_links" 
             >
                  Contact
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/Products" className="nav_links"
             >
                  Products
              </Link>
            </li>
            <li className="mb-4 md:mb-0">
              <Link href="/blog" className="nav_links"
                >
                  Blog
              </Link>
            </li>
          </ul>
        </div>
    </nav>
  );
};

export default NavBar;
