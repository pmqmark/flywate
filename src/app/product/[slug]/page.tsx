import ProductDetailedView from '@/components/product_view/ProductDetailedView'
import { ProductData } from '@/utils/data/product'
import { BASE_URL_FRONTEND } from '@/utils/endpoints'
import { GLOBAL_METADATA } from '@/utils/helper/seo'
import React from 'react'

type paramsProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: paramsProps) {
  const { slug } = await params;
  const Product = ProductData.find((item) => item.seo_title === slug);

  let image;

  if (Product?.img) {
    image = `https://flywate.vercel.app/${Product.img}`;
  } else {
    image = "https://flywate.vercel.app/tabLogo.png";
  }

  return {
    ...GLOBAL_METADATA, // Spread global defaults first
    title: Product?.title || "Flywate",
    description: Product?.seo_Description || "Flywate Nylon Shuttle",
    keywords: Product?.seo_Description || "Flywate, Flywate Nylon Shuttle, ",
    metadataBase: new URL(BASE_URL_FRONTEND),
    alternates: {
      canonical: (BASE_URL_FRONTEND)
    },
    openGraph: {
      ...GLOBAL_METADATA, // Spread OG defaults if any
      title: "Flywate",
      description: "Flywate Nylon Shuttle",
      type: "website",
      url: (BASE_URL_FRONTEND),
      images: [
        {
          url: Product?.img || image,
          width: 1200,
          height: 630,
          alt: "Flywate",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Flywate",
      description: "Flywate Nylon Shuttle",
      images: [image]
    }
  };
}

const ProductView = async ({ params }: paramsProps) => {

  const { slug } = await params
  return (
    <div className='h-screen'>
      <ProductDetailedView id={slug} />
    </div>
  )
}

export default ProductView
