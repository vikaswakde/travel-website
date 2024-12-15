/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { InternationalDestination } from "@/types"; // Import the type

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // Fetching WhatsApp number from .env

export default function InternationalDestinationDetails({
  params,
}: {
  params: { id: string };
}) {
  const [mainImage, setMainImage] = useState(0);
  const [destination, setDestination] =
    useState<InternationalDestination | null>(null); // Use the correct type

  useEffect(() => {
    async function fetchDestination() {
      const supabase = createClientComponentClient();
      const { data } = await supabase
        .from("international") // Update the table name
        .select("*")
        .eq("id", params.id)
        .single();

      if (!data) {
        notFound();
      }
      setDestination(data);
    }

    fetchDestination();
  }, [params.id]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href="/all-international-destinations" // Update the link
                className="text-gray-500 hover:text-gray-700"
              >
                International Destinations
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{destination.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src={destination.images[mainImage]}
                alt={destination.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {destination.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
                  onClick={() => setMainImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${destination.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {destination.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{destination.location}</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">
                About this international destination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {destination.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="space-y-4">
                <button className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                  Book Now
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=I'm interested in visiting ${destination.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 text-white px-6 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Contact via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
