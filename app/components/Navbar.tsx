"use client";
import Image from "next/image";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="navbar_hero" className="relative ">
      <div className="relative">
        <nav className="container mx-auto px-4 py-8 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/s.png"
              alt="TravelScape Logo"
              width={150}
              height={150}
              className="text-2xl font-bold w-[6rem] h-[6rem] md:h-[9.3rem] md:w-[9.3rem] text-primary-600 object-cover absolute md:-top-6"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ">
            <a
              href="/admin"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              Admin
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              Home
            </a>
            <a
              href="#featured_destinations"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              Destinations
            </a>
            <a
              href="#international_destinations"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              International
            </a>
            <a
              href="/gallery"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              Gallery
            </a>
            <a
              href="#contact_whatsapp"
              className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
            >
              Contact
            </a>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              className="bg-[#8CC23D] px-6 py-2 rounded-full hover:bg-primary-700 transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none transition duration-200"
          >
            {!isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden top-[1rem] shadow-lg p-4 ">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
              >
                Home
              </a>
              <a
                href="#featured_destinations"
                className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
              >
                Destinations
              </a>
              <a
                href="#international_destinations"
                className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
              >
                International
              </a>
              <a
                href="/gallery"
                className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
              >
                Gallery
              </a>
              <a
                href="#contact_whatsapp"
                className="text-gray-600 hover:text-primary-600 transition-colors hover:underline"
              >
                Contact
              </a>

              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                className="bg-primary-600 px-6 py-2 rounded-full hover:bg-primary-700 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
