import ProductDetailedView from '@/components/product_view/ProductDetailedView';
interface GenerateMetadataProps {
  params: { slug: string };
}

// Use inline type definition for page props to avoid conflicts
export default function ProductView({params}:GenerateMetadataProps) {

  const {slug} = params

  return (
    <div className="h-screen">
      <ProductDetailedView id={slug} />
    </div>
  );
}