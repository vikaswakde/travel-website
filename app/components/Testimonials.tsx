"use client";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getApprovedTestimonials } from "@/utils/supabaseClient";
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  tour: string;
  rating: number;
  comment: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        setTestimonials(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        setIsLoading(false);
      }
    };
    loadTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  if (!testimonials.length) {
    return <div>No testimonials available</div>;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from our satisfied travelers around the world
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div className="bg-white p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  {currentTestimonial.image ? (
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-600 flex items-center justify-center text-black text-xl font-semibold border bg-gray-300">
                      {currentTestimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentTestimonial.tour}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <span key={i} className="w-5 h-5">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  {currentTestimonial.comment}
                </p>
              </div>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                target="_blank"
                className="text-primary-600 hover:text-primary-700 inline-flex items-center"
              >
                <span>Book Similar Tour</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>

          <button
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none z-10"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none z-10 transition duration-300"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-12 text-center">
          <a
            href="#testimonial_sub"
            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors"
          >
            <span>Share Your Experience</span>
          </a>
        </div>
      </div>
    </section>
  );
}
