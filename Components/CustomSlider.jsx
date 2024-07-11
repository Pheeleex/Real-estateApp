'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const dotsContainerStyles = "absolute bottom-4 w-full flex justify-center top-[75%]";
const dotStyle = "mx-1 cursor-pointer w-2 h-2 rounded-full bg-gray-400";
const activeDotStyle = "bg-red-600";

const CustomSlider = ({ items, width, height, slideImgClass, slideContClass, largeCont, imagesPerSlide = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedItems = [];
  for (let i = 0; i < items.length; i += imagesPerSlide) {
    groupedItems.push(items.slice(i, i + imagesPerSlide));
  }

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [groupedItems.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`home-slider ${largeCont} flex-1 basis-[45%] h-full relative`}>
      <div className={`image ${slideContClass} flex w-full h-full overflow-hidden`}>
        {groupedItems.map((group, index) => (
          <div
            key={index}
            className={`slide-img ${slideImgClass} flex w-full  transition-transform duration-300 ease-in-out`}
            style={{ transform: `translateX(${-100 * currentIndex}%)` }}
            aria-hidden={currentIndex !== index}
          >
            {group.map((url, imgIndex) => (
              <Image
                key={imgIndex}
                src={url}
                alt={`Slide ${index + 1} - Image ${imgIndex + 1}`}
                className="w-full h-full object-cover"
                width={width}
                height={height}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={dotsContainerStyles}>
        {groupedItems.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`${dotStyle} ${index === currentIndex ? activeDotStyle : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomSlider;
