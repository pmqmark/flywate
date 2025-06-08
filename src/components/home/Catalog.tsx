import Image from 'next/image'
import React from 'react'
import ContainerWrapper from '../common/ContainerWrapper'
import { ProductData } from '@/utils/data/product'
import ProductCard from './ProductCard'

const Catalog = () => {
  return (
    <div className='w-full h-full mb-10 lg:h-screen relative overflow-hidden bg-black text-white'>
      <Image src={'/home/bgImage1.png'} alt='bg-element' title='bg-element' className='absolute top-5 md:top-10 right-0 object-contain' width={720} height={780} />
      <Image src={'/home/bgImage2.png'} alt='bg-element' title='bg-element' className='absolute bottom-0 left-0 object-contain' width={720} height={780} />

      <ContainerWrapper className='flex items-center justify-center gap-3 md:gap-5 '>
        <hr className='h-[1px] bg-primary border-0 w-full my-4' />
        <h1 className='font-sans italic text-[24px] md:text-[35px] text-nowrap'>Our Catalog</h1>
        <hr className='h-[1px] bg-primary border-0 w-full my-4' />
      </ContainerWrapper>

      <ContainerWrapper className='flex flex-wrap items-center justify-center gap-5 md:gap-10'>
        {
          ProductData.map((item)=>(
            <ProductCard key={item.id} data={item} />
          ))
        }
      </ContainerWrapper>

    </div>
  )
}

export default Catalog
