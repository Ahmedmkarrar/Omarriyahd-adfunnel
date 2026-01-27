import { Hero } from "@/components/landing/Hero";
import { Highlights } from "@/components/landing/Highlights";
import { PhotoGallery } from "@/components/landing/PhotoGallery";
import { PropertyDetails } from "@/components/landing/PropertyDetails";
import { Location } from "@/components/landing/Location";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-luxury-black">
      <Hero />
      <Highlights />
      <PhotoGallery />
      <PropertyDetails />
      <Location />
      <FinalCTA />
    </main>
  );
}
