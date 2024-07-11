'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const   NavBar = () => {
  const [nav, setNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

//function to load and navigate to selected link
  const handleNavClick = (href) => {
    setLoading(true);
    setNav((prev) => !prev);
    router.push(href);
  };

//Toggle navlinks in mobile view
  const toggleNav = () => {
    setNav((prev) => !prev);
  };

  //identify link that is currently active
  const isActive = (path) => (pathname === path ? 'active' : '');

  //stop loading once pathname changes
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const links = ['About', 'Contact', 'Products'];

  return (
    <nav className="nav">
      <div className="nav-left">     
        <Link href="/" className="flex justify-center items-center">
        <FontAwesomeIcon icon={faHouse} className='text-[2rem]' />
          <span className='text-3xl font-bold'>Oyster Estate</span>
        </Link>
      </div>
      <Menu
        onClick={toggleNav}
        color="#880808"
        size={40}
        className="menu-icon"
      />
      <div className={`nav-links ${nav ? 'show' : 'hide'}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              href="/"
              onClick={() => {
                handleNavClick('/');
              }}
              className={`nav-link ${isActive('/')}`}
            >
              Home
            </Link>
          </li>
          {links.map((link) => (
            <li key={link} className="nav-item">
              <Link
                href={`/${link}`}
                onClick={() => {
                  handleNavClick(`/${link}`);
                }}
                className={`nav-link ${isActive(`/${link}`)}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
