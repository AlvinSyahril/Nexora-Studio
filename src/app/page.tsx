import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductRoster from "@/components/ProductRoster";
import StudioBento from "@/components/StudioBento";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductRoster />
        <StudioBento />
      </main>
      <Footer />
    </>
  );
}
