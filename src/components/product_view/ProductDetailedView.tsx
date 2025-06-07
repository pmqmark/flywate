import { ProductData } from '@/utils/data/product'
import React from 'react'
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import ContainerWrapper from '../common/ContainerWrapper';

const ProductDetailedView = ({ id }: { id: string }) => {

    const Product = ProductData.find((item) => item.seo_title === id);
    console.log(Product);

    if (!Product) {
        return <div>Product not found</div>;
    }
    return (
        <ContainerWrapper className=''>
            <div>
                <ProductImage />
            </div>
            <div>
                <ProductDetails data={Product} />
            </div>
        </ContainerWrapper>
    )
}

export default ProductDetailedView
