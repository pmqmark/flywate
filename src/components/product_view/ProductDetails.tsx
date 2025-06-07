import { ProductProps } from '@/types/product'
import React from 'react'
import Button from '../common/ui/Button'

const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className='p-5 md:p-14 mt-3 md:mt-20 font-sans '>
        <h1 className='text-[24px] md:text-[28px] font-medium'>FLYWATE Clover 10 Nylon Shuttle - Yellow</h1>
        <div className='space-y-2 mt-3 font-mono'>
          <h3 className='flex items-center gap-3 '> <span className='font-semibold text-[22px] '>₹ {data.amount}</span>
            <span className='text-[12px] text-[#ffffff]/60 line-through'>₹{data.originalPrice}</span>
            <span className='text-[12px] '>{data.offerPercentage}% off</span>
          </h3>
        </div>

        {/* delivery options */}
        <div className='my-6'>
          <h4 className='text-[16px] font-semibold'>Delivery</h4>
          <div className='flex gap-5 my-3'>
            <input type="text" placeholder='Enter delivery pincode' className='border px-3 text-xs w-full md:w-[50%]' />
            <button className='border border-primary p-2 px-4 text-sm'>CHECK</button>
          </div>
          <p className='text-[16px] font-semibold'>Delivery by February 6th, Thursday</p>
          <span className='text-[12px] mt-2 text-[#FFFFFF]/60'>If ordered before 11:59AM</span>
        </div>

        <hr className='text-[#FFFFFF]/30 my-2' />

        <div className='my-6'>
          <h4 className='text-[16px] font-semibold'>SPECIFICATIONS</h4>
          <div className='flex items-center gap-5 my-3 text-[#FFFFFF]/80 text-[14px]'>
            <h6>Number of contents in sales package</h6>
            <h6>Pack of 6</h6>
          </div>
          <p className='text-[15px] text-white/80'>Color <span className='text-[15px] font-semibold pl-3'>Yellow</span></p>
        </div>

        <hr className='text-[#FFFFFF]/30 my-2' />

        <div className='my-6 mb-32'>
          <h4 className='text-[16px] font-semibold'>PRODUCT SPECIFICATION</h4>
          <p className='my-3 text-[15px] text-white/80 text-justify'>Constructed from durable nylon, these shuttles can offer a robust build that withstands rigorous play. This can ensure longevity, making them a reliable choice for frequent games and practice sessions. So, whether you are hitting them hard during a match or using them in a casual backyard game, these shuttles can resist wear and tear and maintain consistent performance over time.</p>
        </div>
      </div>
      <div className='bg-black absolute p-5 bottom-0 border-t border-[#FFFFFF]/30 w-full ms:px-14 flex items-center justify-end'>
        <Button title='BUY NOW' link='/' className='md:px-10' />
      </div>
    </>
  )
}

export default ProductDetails
