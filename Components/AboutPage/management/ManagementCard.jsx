'use client'
// ManagementCard.js
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { review1,  review2, review3 } from '@/utils';

const ManagementCard = () => {
    const managementData = [
        {
          imageSrc: review1,
          name: 'Tobey Mase',
          role: 'Managing Director'
        },
        {
          imageSrc: review2,
          name: 'Uchemba Gabriella',
          role: 'Managing Director'
        },
        {
          imageSrc: review3,
          name: 'Tom Obochi',
          role: 'Managing Director'
        }
      ];
  return (
    <div className='management-box'>
    {
        managementData.map((item,url) => (
            <motion.div 
      initial={{y: 180}}
      whileInView={{y: [135, 90, 45, 0]}}
      transition={{duration: 2}}
      className="m-box">
      <div className="image-cards">
        <div className="image">
          <Image src={item.imageSrc} alt={`${item.name}, ${item.role}`}
            className='img' />
        </div>
        <div className="desc">
          <p className="grade">Group Board</p>
          <h3>{item.name}</h3>
          <p>{item.role}</p>
        </div>
      </div>
    </motion.div>
        ))
    }
    </div>
  );
};
export default ManagementCard