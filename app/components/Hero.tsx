/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getHeroImages } from "@/utils/supabaseClient";

export const revalidate = 0;
export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const [heroImages, setHeroImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await getHeroImages();
      setHeroImages(images);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (heroImages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages]);

  if (heroImages.length === 0) return null;

  return (
    <section id="navbar_hero" className="relative  min-h-screen py-[10rem]">
      <div className="w-full mx-auto absolute -top-[1rem] md:top-[3rem]  rounded-3xl text-black">
        <h2 className="text-center text-4xl md:text-[3.2rem] font-bold pt-[5rem] md:py-0">
          Welcome to
          <span className="md:hidden">
            <br />
          </span>
          <span className="bg-yellow-400 pl-1 pr-1 pb-1 pt-[2px] md:p-1 ml-1 rounded-sm shadow-md md:mt-0 ">
            Suparnam Holidays!
          </span>
        </h2>
      </div>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              {heroImages[currentImage].title}
            </h1>
            <p
              className="text-lg text-gray-600 mb-8 animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              {heroImages[currentImage].subtitle}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#featured_destinations"
                className="bg-primary-600 border bg-[#8CC23D] px-8 py-3 rounded-full hover:bg-primary-700 transition-colors text-center"
              >
                Explore Destinations
              </a>
              <a
                href="#popular_packages"
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-full hover:bg-blue-200 transition-colors text-center"
              >
                View Packages
              </a>
            </div>
          </div>
          <div
            className="lg:w-1/2 lg:pl-12 animate-slide-left"
            style={{ animationDelay: "600ms" }}
          >
            <div className="relative">
              <div className="bg-primary-100 absolute inset-0 rounded-2xl transform rotate-3"></div>
              <Image
                src={heroImages[currentImage].image_url}
                alt={heroImages[currentImage].title}
                width={600}
                height={400}
                className="relative rounded-2xl shadow-xl"
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
