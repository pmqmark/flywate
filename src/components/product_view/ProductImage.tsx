'use client'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'

const ProductImage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  // Sample product images - replace with your actual image paths
  const productImages = [
    "/product/product2.png",
    "/product/product2.png",
    "/product/product2.png",
    "/product/product2.png",
  ]

  const goToSlide = useCallback((index: number) => {
    setIsLoading(true)
    setCurrentSlide(index)
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const goToNextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % productImages.length)
  }, [currentSlide, goToSlide, productImages.length])

  const goToPrevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + productImages.length) % productImages.length)
  }, [currentSlide, goToSlide, productImages.length])

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(goToNextSlide, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [goToNextSlide])

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-full h-full flex flex-col gap-10 items-center justify-center p-5 py-12 pt-20 relative'>
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-70 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Main image container */}
      <div className='relative w-full max-w-[780px] h-[400px] md:h-[500px]'>
        {productImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              title={`Product Image ${index + 1}`}
              className='object-contain w-full h-full'
              priority
              width={780}
              height={780}
              onLoadingComplete={() => setIsLoading(false)}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button 
        onClick={goToPrevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition-all cursor-pointer"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={goToNextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2  bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition-all cursor-pointer"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Pagination indicators */}
      <div className='flex gap-2'>
        {productImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded w-[30px] md:w-[40px] transition-all duration-300 cursor-pointer ${
              currentSlide === index ? 'bg-primary' : 'bg-[#2E3636]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImage