import Image from 'next/image'
import React from 'react'

interface CarousalCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

const CarousalCard: React.FC<CarousalCardProps> = ({ name, role, image, content }) => {
  return (
    <div className='border border-primary p-5 md:p-7 flex flex-col items-center text-center justify-center font-sans bg-black z-40 h-[250px] md:h-[400px] w-full overflow-hidden'>
      <Image 
        src={image} 
        alt={name} 
        title={name} 
        className='object-cover rounded-full w-[50px] md:w-[100px] md:h-[100px] overflow-hidden' 
        width={100} 
        height={100} 
      />
      <h3 className='font-semibold text-[16px] md:text-[20px] mt-1'>{name}</h3>
      <p className='text-[10px] md:text-[15px] mt-1'>{role}</p>
      {content && (
        <p className='text-center text-[10px] md:text-[14px] mt-2 md:mt-3 md:w-[80%] line-clamp-4'>
          {content}
        </p>
      )}
    </div>
  )
}

export default CarousalCard