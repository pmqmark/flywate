import { ProductProps } from '@/types/product'
import Image from 'next/image'
import React from 'react'

const ProductCard = ({ data }: ProductProps) => {
    return (
        <div className='w-[280px] p-5 border border-primary min-h-[380px] bg-black z-40'>
            <Image src={data.img}
                alt={data.title} title={data.title}
                className='object-contain'
                width={780}
                height={780}
            />
            <div className='space-y-2 mt-3 font-mono'>
                <h2 className='text-[18px] font-medium'>{data.title}</h2>
                <p className='text-[13px] text-[#ffffff]/60'>{data.seo_Description}</p>
                <p className='flex items-center gap-3 '> <span className='font-semibold text-[17px] '>₹ {data.amount}</span>
                    <span className='text-[13px] text-[#ffffff]/60 line-through'>₹{data.originalPrice}</span>
                    <span className='text-[13px] text-[#129777]'>{data.offerPercentage}% off</span>
                </p>
            </div>
        </div>
    )
}

export default ProductCard
