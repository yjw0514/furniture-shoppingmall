import React, { useEffect, useRef, useState } from 'react';

import './Slider.css';

const delay = 2500;

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setSlideIndex((prevIndex) => (prevIndex === 4 ? 1 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  const moveDot = (index) => {
    setSlideIndex(index);
  };
  return (
    <div className='container-slider'>
      {Array.from({ length: 4 }).map((item, index) => {
        return (
          <div
            key={index}
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
          >
            <img
              src={
                process.env.PUBLIC_URL + `/image/sliderImg/img${index + 1}.jpg`
              }
              alt=''
            />
          </div>
        );
      })}
      <div className='container-dots'>
        {Array.from({ length: 4 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
}
