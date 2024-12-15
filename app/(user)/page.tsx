import { Hero } from "@/app/components/Hero";
import { FeaturedDestinations } from "@/app/components/FeaturedDestinations";
import { Testimonials } from "@/app/components/Testimonials";
import { Navbar } from "../components/Navbar";
import PopularPackages from "../components/InternationalDestinations";
import OurServices from "../components/OurServices";
import BookNow from "../components/BookNow";
import Footer from "../components/Footer";
import { TestimonialSubmissionForm } from "../components/TestimonialSubmissionForm";
import { DiscountBanner } from "../components/DiscountBanner";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DiscountBanner />
      <FeaturedDestinations />
      <PopularPackages />
      <OurServices />
      <Testimonials />
      <BookNow />
      <TestimonialSubmissionForm />
      <Footer />
    </main>
  );
}
