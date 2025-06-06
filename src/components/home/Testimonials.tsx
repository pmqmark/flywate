import Image from 'next/image'
import React from 'react'
import ContainerWrapper from '../common/ContainerWrapper'
import HomeCarousal from './HomeCarousal'

const Testimonials = () => {
  return (
    <div className='w-full h-full mb-28 md:mb-36 lg:min-h-screen relative overflow-hidden'>
      <Image src={'/home/1.png'} alt='' title='' className='absolute top-10 md:top-18 left-0 object-contain w-fit' width={720} height={780} />
      <Image src={'/home/2.png'} alt='' title='' className='absolute bottom-0 right-0 object-contain w-fit' width={720} height={780} />

      <ContainerWrapper className='flex items-center justify-center gap-3 md:gap-5 pl-20 md:pl-16'>
        <h1 className='font-sans italic text-[24px] md:text-[35px] text-nowrap'>What people say</h1>
        <hr className='h-[1px] bg-primary border-0 w-full my-4' />
      </ContainerWrapper>

      {/* Carousal */}
      <div className='w-full h-full '>
        <HomeCarousal />
      </div>
    </div>
  )
}

export default Testimonials
