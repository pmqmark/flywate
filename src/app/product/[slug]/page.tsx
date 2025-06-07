import ProductDetailedView from '@/components/product_view/ProductDetailedView';
import { ProductData } from '@/utils/data/product';
import { BASE_URL_FRONTEND } from '@/utils/endpoints';
import { GLOBAL_METADATA } from '@/utils/helper/seo';
import { Metadata } from 'next';

// Define props without explicit PageProps to avoid type conflicts
interface GenerateMetadataProps {
  params: { slug: string };
}

export async function generateMetadata({ 
  params 
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = params;

  const Product = ProductData.find((item) => item.seo_title === slug);
  const image = Product?.img
    ? `https://flywate.vercel.app/${Product.img}`
    : 'https://flywate.vercel.app/tabLogo.png';

  return {
    ...GLOBAL_METADATA,
    title: Product?.title || 'Flywate',
    description: Product?.seo_Description || 'Flywate Nylon Shuttle',
    keywords: Product?.seo_Description || 'Flywate, Flywate Nylon Shuttle',
    metadataBase: new URL(BASE_URL_FRONTEND),
    alternates: {
      canonical: `${BASE_URL_FRONTEND}/product/${slug}`,
    },
    openGraph: {
      ...GLOBAL_METADATA,
      title: Product?.title || 'Flywate',
      description: Product?.seo_Description || 'Flywate Nylon Shuttle',
      type: 'website',
      url: `${BASE_URL_FRONTEND}/product/${slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: Product?.title || 'Flywate',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: Product?.title || 'Flywate',
      description: Product?.seo_Description || 'Flywate Nylon Shuttle',
      images: [image],
    },
  };
}

// Use inline type definition for page props to avoid conflicts
export default function ProductView({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const { slug } = params;

  return (
    <div className="h-screen">
      <ProductDetailedView id={slug} />
    </div>
  );
}