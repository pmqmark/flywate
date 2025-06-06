'use client'
import React, { useEffect, useState } from 'react'
import CarousalCard from './CarousalCard'

const testimonials = [
  {
    id: 1,
    name: 'Arun George',
    role: 'Former World number 40 | Indian national champion',
    image: '/home/profile.png',
    content: 'I ve personally tried flywate clover 10 and the resemblance it has to flight of a feather shuttle is really quiet astonishing and I would recommend it to any player across the globe.'
  },
  {
    id: 2,
    name: 'Player Two',
    role: 'National Champion',
    image: '/home/profile.png',
    content: 'I have personally tried flywate clover 10 and the resemblance it has to flight of a feather shuttle is really quiet astonishing and I would recommend it to any player across the globe.'
  },
  {
    id: 3,
    name: 'Player Three',
    role: 'International Competitor',
    image: '/home/profile.png',
    content: 'I have personally tried flywate clover 10 and the resemblance it has to flight of a feather shuttle is really quiet astonishing and I would recommend it to any player across the globe.'
  },
  {
    id: 4,
    name: 'Player Four',
    role: 'Olympic Medalist',
    image: '/home/profile.png',
    content: 'I have personally tried flywate clover 10 and the resemblance it has to flight of a feather shuttle is really quiet astonishing and I would recommend it to any player across the globe.'
  }
];

const HomeCarousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Mobile view - single card
  if (isMobile) {
    return (
      <div className='w-full h-full mb-20'>
        <div className='relative w-full h-full'>
          {/* Single Card for Mobile */}
          <div className='transition-opacity duration-500 ease-in-out px-4'>
            <CarousalCard 
              name={testimonials[currentIndex].name}
              role={testimonials[currentIndex].role}
              image={testimonials[currentIndex].image}
              content={testimonials[currentIndex].content}
            />
          </div>
          
          {/* Indicators */}
          <div className='flex justify-center mt-6 space-x-2'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Desktop view - multiple cards
  const visibleCards = 3; // Show 3 cards on desktop

  const getVisibleTestimonials = () => {
    const half = Math.floor(visibleCards / 2);
    let start = currentIndex - half;
    let end = currentIndex + half;
    
    if (start < 0) {
      start = testimonials.length + start;
      return [...testimonials.slice(start), ...testimonials.slice(0, end + 1)];
    } else if (end >= testimonials.length) {
      end = end - testimonials.length;
      return [...testimonials.slice(start), ...testimonials.slice(0, end + 1)];
    }
    
    return testimonials.slice(start, end + 1);
  };

  return (
    <div className='w-full h-full mb-20 '>
      <div className='relative w-full h-full'>
        {/* Slides Container */}
        <div className='flex items-center justify-center gap-4 md:gap-10 px-4 pt-4 md:pt-8'>
          {getVisibleTestimonials().map((testimonial) => {
            const isCenter = testimonial.id === testimonials[currentIndex].id;
            return (
              <div 
                key={testimonial.id} 
                className={`transition-all duration-300 ease-in-out ${isCenter ? 'scale-100 opacity-100' : 'scale-90 opacity-100'}`}
                style={{
                  flex: isCenter ? '1 0 60%' : '1 0 20%',
                  maxWidth: isCenter ? '60%' : '100%',
                }}
              >
                <CarousalCard 
                  name={testimonial.name}
                  role={testimonial.role}
                  image={testimonial.image}
                  content={isCenter ? testimonial.content : ''}
                />
              </div>
            );
          })}
        </div>
        
        {/* Indicators */}
        <div className='flex justify-center mt-6 space-x-2'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousal;