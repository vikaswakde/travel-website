"use client";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="navbar_hero" className="relative ">
      <div className="relative">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="#" className="text-2xl font-bold text-primary-600">
              TravelScape
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 ">
            <a
              href="#"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#featured_destinations"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Destinations
            </a>
            <a
              href="#popular_packages"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Packages
            </a>
            <a
              href="#travel_services"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#contact_whatsapp"
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Contact
            </a>
            <button className="bg-primary-600 px-6 py-2 rounded-full hover:bg-primary-700 transition-colors">
              Book Now
            </button>
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
          <div className="lg:hidden  top-[1rem] shadow-lg p-4 ">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#featured_destinations"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#popular_packages"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Packages
              </a>
              <a
                href="#travel_services"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact_whatsapp"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Contact
              </a>
              <button className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors w-full">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
