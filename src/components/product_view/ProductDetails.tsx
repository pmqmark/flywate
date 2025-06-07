import { ProductProps } from '@/types/product'
import React from 'react'
import Button from '../common/ui/Button'

const ProductDetails = ({ data }: ProductProps) => {
  return (
    <div className='p-5 font-sans'>
      <h1>FLYWATE Clover 10 Nylon Shuttle - Yellow</h1>
      <div className='space-y-2 mt-3 font-mono'>
        <p className='text-[13px] text-[#ffffff]/60'>{data.seo_Description}</p>
        <p className='flex items-center gap-3 '> <span className='font-semibold text-[17px] '>₹ {data.amount}</span>
          <span className='text-[13px] text-[#ffffff]/60 line-through'>₹{data.originalPrice}</span>
          <span className='text-[13px] text-[#129777]'>{data.offerPercentage}% off</span>
        </p>
      </div>


      {/* delivery options */}
      <div>

      </div>

      <div className='bg-black'>
        <Button title='BUY NOW' link='/' />
      </div>
    </div>
  )
}

export default ProductDetails
