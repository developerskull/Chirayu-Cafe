import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import BestSellers from '@/components/BestSellers';
import MenuSection from '@/components/MenuSection';
import Celebrations from '@/components/Celebrations';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Highlights />
      <BestSellers />
      <MenuSection />
      <Celebrations />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <CartDrawer />
    </main>
  );
}
