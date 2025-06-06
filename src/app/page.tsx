import Catalog from "@/components/home/Catalog";
import HeroSection from "@/components/home/HeroSection";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <HeroSection />

      {/* Our Catalog */}
      <Catalog />

      {/* testimonials */}
      <Testimonials />
    </>
  );
}
