//components/slides.js
"use client"
// Imports
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


export const Slideshow = ({ className, slides = [] }) => {

  return (

    <Slide
      infinite={true}
      autoplay={true}
      duration={5000}
      transitionDuration={850}
      defaultIndex={0}
      className={`fixed inset-0 z-[-10] w-[100vw] ${className}`}
    >
      {slides.map((imageUrl, index) => (
        <div className="each-slide h-[130vh] w-[100vw]" key={index}>
          <img 
            src={imageUrl} 
            alt={`slide-${index}`} 
            className='w-[100vw] h-full object-cover'
            draggable="false"
            onMouseDown={(e) => e.preventDefault()}
          />
        </div>
      ))}
    </Slide>
  );
};