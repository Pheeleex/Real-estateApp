"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import './Services.css'


const servicesData = [
  {
    title: 'Buy/Sell',
    description: `When you choose Oyster Properties, you can feel confident that you are investing in properties of exceptional 
                  quality, backed by a reputable and trustworthy company`,
    link: 'properties'
  },
  {
    title: 'Rent',
    description: `Choose from a wide variety of properties, whether for long or short 
                  stay we guarantee you will love everything we have to offer.`,
    link: 'properties'
  },
  {
    title: 'Develop',
    description: `We are committed to developing properties of the highest quality, with innovative designs and modern amenities. 
      Our attention to detail sets us apart, ensuring that our properties exceed your expectations.`,
    link: 'Contact'
  }
];

const Services = () => {
  return (
    <section className="services mt-7 mb-8"
      aria-labelledby="services-heading">
        <motion.h2
          intial={{x: 500}}
          whileInView={{ x: [100, 0]}}
          transition={{duration: 2}}
          className="service-head mb-3 ml-4 font-bold">Our Services</motion.h2>
        <motion.div
          intial={{x: 0}}
          whileInView={{ x: [-300, 0]}}
          transition={{duration: 2}}
        className="line mb-3 "></motion.div>
        <h3 className='head text_red_300'>Discover unparalleled property solutions with our dynamic property development firm</h3>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'We Sell',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'We Buy',
            1000,
            'We Rent',
            1000,
            'We Develop',
            1000
      ]}
          wrapper="p"
          className='head'
          speed={50}
          style={{ fontSize: '2em', display: 'inline-block', color:'brown', height: '100px' }}
          repeat={Infinity}
           aria-live="polite"
        />

      <div className="cards-container m-2 ml-4 flex justify-between 
      items-center gap-4 mt-0">
        {servicesData.map((service, index) => (
          <motion.div
          initial={{ scale: 0, y: 0 }}
          whileInView={{ scale:[ 0.6, 0.8, 1], y:[ 50, 0] }}
          transition={{duration: 1.8}}
          key={index} >
              <div className="cards flex flex-col gap-4 p-4 
              rounded-2xl">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                <Link href='/' className='link red_text' 
                  aria-label={`Learn more about ${service.title}`}>
                    See how it works</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;
