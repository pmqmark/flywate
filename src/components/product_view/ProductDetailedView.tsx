import { ProductData } from '@/utils/data/product'
import React from 'react'

const ProductDetailedView = ({ id }: { id: string }) => {

    const Product = ProductData.find((item)=> item.seo_title === id);
    console.log(Product)
    return (
        <div>

        </div>
    )
}

export default ProductDetailedView
