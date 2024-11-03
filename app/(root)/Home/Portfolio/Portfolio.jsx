'use client'
import React from 'react'
import './Portfolio.css'
import { motion } from 'framer-motion';
import { build1, build2, build3 } from "@/utils"
import PortfolioItem from './PortfolioItem';

const Portfolio = () => {
    const portfolioData = [
        {
          imageSrc: build1,
          title: 'Galactica',
          description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Quibusdam voluptatibus, 
          quos quia ut ullam ducimus voluptatem dolores 
          reiciendis voluptatum sint maxime, perferendis 
          laboriosam eius commodi exercitationem accusamus, 
          ad placeat perspiciatis.`
        },
        {
          imageSrc: build2,
          title: 'Galactica',
          description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Quibusdam voluptatibus, 
          quos quia ut ullam ducimus voluptatem dolores 
          reiciendis voluptatum sint maxime, perferendis 
          laboriosam eius commodi exercitationem accusamus, 
          ad placeat perspiciatis.`
        },
        {
          imageSrc: build3,
          title: 'Galactica',
          description: `Lorem ipsum dolor sit amet consectetur 
          adipisicing elit. Quibusdam voluptatibus, 
          quos quia ut ullam ducimus voluptatem dolores 
          reiciendis voluptatum sint maxime, perferendis 
          laboriosam eius commodi exercitationem accusamus, 
          ad placeat perspiciatis.`
        }
      ];
  return (
   <section className='mt-40'>
         <motion.h2 
         intial={{y: -20}}
         whileInView={{ y: [-100, 0]}}
         transition={{duration: 1}}
          className="service-head">Portfolio</motion.h2>
      <div
            className="line">
            </div>
            {
                portfolioData.map((item, index) => (
                    <PortfolioItem key={index} imageSrc={item.imageSrc} 
                    title={item.title} description={item.description} />
                ))
            }
   </section>
  )
}

export default Portfolio