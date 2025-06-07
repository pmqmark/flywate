
import ProductDetailedView from '@/components/product_view/ProductDetailedView';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductView() {
  return (
    <div className="">
      <ProductDetailedView />

      {/* footer part */}
      <div className='p-3 px-3  md:px-10 border-t border-white/40 flex items-center justify-center md:justify-start'>
        <Link href={'/'} title='logo' className='relative md:w-[20%] '>
          <Image
            src={"/common/flywate_logo.png"}
            alt='Logo' title='site logo'
            className='object-contain w-fit md:w-24 ' priority width={780} height={780}
          />
        </Link>
      </div>
    </div>
  );
}