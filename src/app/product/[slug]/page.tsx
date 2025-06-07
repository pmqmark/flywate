import { Metadata } from 'next';
import ProductDetailedView from '@/components/product_view/ProductDetailedView';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Your metadata generation logic here
  return {
    title: `Product ${params.slug}`,
    // other metadata fields
  };
}

export default async function ProductView({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="h-screen">
      <ProductDetailedView id={slug} />
    </div>
  );
}