'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-cont">
        <div className="footer-cont1">
          <Link href="/" className="nk">
            <FontAwesomeIcon icon={faHome} />
            Home
          </Link>
          <p>
            Oyster Property Invest is a leading property investment company providing investors with an opportunity to diversify into the UK property market.
          </p>
        </div>

        <div className="footer-cont2">
          <div className="box">
            <h3>Location</h3>
            <p>
              Lagos Office: House 2 Crescent Cross Estate, Hakeem Dickson Link Road, Elf Bus Stop, Lekki Phase 1, Lagos.
            </p>
          </div>
          <div className="box">
            <h3>Quick Links</h3>
            <Link href="/" className="quick-link">Home</Link>
            <Link href="/about" className="quick-link">About</Link>
            <Link href="/contact" className="quick-link">Contact</Link>
            <Link href="/blog" className="quick-link">Blog</Link>
          </div>
          <div className="box">
            <h3>Contact Info</h3>
            <p>+234558900</p>
            <p>soro@gmail.com</p>
          </div>
          <motion.div 
             initial={{scale: 0}}
             whileInView={{scale: [0, 1.5, 1]}}
            className="media">
            <FontAwesomeIcon 
              icon={faFacebook}
              className='icons' 
              size='2x'
            />
            <FontAwesomeIcon 
              icon={faInstagram}
              className='icons' 
              size='2x'
            />
            <FontAwesomeIcon 
              icon={faTwitter}
              className='icons' 
              size='2x'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
