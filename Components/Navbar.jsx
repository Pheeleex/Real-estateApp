'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const NavBar = () => {
  const [nav, setnav] = useState(false)
  const [loading, setLoading] =useState(false)
  const pathname = usePathname();
  const router = useRouter()


  /*Loading effect during navigation*/
  const handleNavClick = (href) => {
    setLoading(true)
    router.push(href)
  }


/*Function to display navlinks in mobile view*/
  const toggleNav = () =>{
    setnav(prev => !prev)
  }



  // Function to check if the link is active
  const isActive = (path) => pathname === path ? 'active' : '';

  useEffect(() => {
    setLoading(false)
  }, [pathname])


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
              <Link href="/" onClick={()=>{handleNavClick('/')}}
                className={`nav_links ${isActive('/')}`}>
                  Home
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/About" onClick={()=>{handleNavClick('/About')}}
              className={`nav_links ${isActive('/About')}`}>
                  About
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/Contact" onClick={()=>{handleNavClick('/Contact')}}
              className={`nav_links ${isActive('/Contact')}`}
             >
                  Contact
              </Link>
            </li>
            <li className="mb-4 md:mb-0 md:mr-8">
              <Link href="/Products" onClick={()=>{handleNavClick('/Products')}}
              className={`nav_links ${isActive('/Products')}`}
             >
                  Products
              </Link>
            </li>
            <li className="mb-4 md:mb-0">
              <Link href="/blog" onClick={()=>{handleNavClick('/blog')}}
                className={`nav_links ${isActive('/Blog')}`}
                >
                  Blog
              </Link>
            </li>
          </ul>
        </div>
        {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-52">
          <div className="loader"></div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
