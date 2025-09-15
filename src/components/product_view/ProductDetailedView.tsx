import { ProductData } from '@/utils/data/product'
import React from 'react'
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';

const ProductDetailedView = () => {

    const Product = ProductData[0];

    if (!Product) {
        return <div>Product not found</div>;
    }
    return (
        <div className='w-full h-full flex flex-col md:flex-row overflow-hidden'>
            <div className='w-full min-h-full md:w-[40%]'>
                <ProductImage />
            </div>
            <div className='w-full h-full md:w-[60%] bg-[#071313]/70 md:border-l border-[#FFFFFF]/30 overflow-hidden relative'>
                <ProductDetails data={Product} />
            </div>
        </div>
    )
}

export default ProductDetailedView
