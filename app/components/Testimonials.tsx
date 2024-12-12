"use client";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export async function getApprovedTestimonials() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function Testimonials() {
  const testimonials = await getApprovedTestimonials();

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

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <div className="bg-white p-6 rounded-xl border shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary-600 flex items-center justify-center text-black text-xl font-semibold border bg-gray-300">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.tour}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="w-5 h-5">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 italic">
                      {testimonial.comment}
                    </p>
                  </div>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    className="text-primary-600 hover:text-primary-700 inline-flex items-center"
                  >
                    <span>Book Similar Tour</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none z-10"
            onClick={() => {
              const container = document.querySelector(".flex") as HTMLElement;
              if (container) {
                container.scrollLeft -= container.offsetWidth;
              }
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none z-10"
            onClick={() => {
              const container = document.querySelector(".flex") as HTMLElement;
              if (container) {
                container.scrollLeft += container.offsetWidth;
              }
            }}
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
