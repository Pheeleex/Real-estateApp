'use client'

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <section className="footer w-full">
      <div className="footer-cont flex w-full">
        <div className="footer-cont1 flex flex-col gap-4 p-4 flex-1">
          <Link href="/" className="home-link">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
          <p>
            Oyster Property Invest is a leading property investment company providing investors with an opportunity to diversify into the UK property market.
          </p>
        </div>

        <div className="footer-cont2 gap-8">
          <div className="box ">
            <h3>Location</h3>
            <p>
              Lagos Office: House 2 Crescent Cross Estate, Hakeem Dickson Link Road, Elf Bus Stop, Lekki Phase 1, Lagos.
            </p>
          </div>
          <div className="box bx">
            <h3>Quick Links</h3>
            <Link href="/" className="quick-link">Home</Link>
            <Link href="/about" className="quick-link">About</Link>
            <Link href="/contact" className="quick-link">Contact</Link>
            <Link href="/blog" className="quick-link">Blog</Link>
          </div>
          <div className="box bx ">
            <h3>Contact Info</h3>
            <p>+234558900</p>
            <p>soro@gmail.com</p>
          </div>
          
          <motion.div 
            className="media flex flex-col justify-start
            items-start gap-14 mt-0"
            initial={{scale: 0}}
            whileInView={{scale: [0, 1.5, 1]}}
          >
            <FontAwesomeIcon 
              icon={faFacebook}
              className='icons red_text' 
              size='2x'
              />

              <FontAwesomeIcon 
                icon={faInstagram}
                className='icons red_text' 
                size='2x' />

              <FontAwesomeIcon 
                icon={faTwitter}
                className='icons red_text' 
                size='2x' />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
