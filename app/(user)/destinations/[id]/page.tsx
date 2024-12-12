import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

export default async function DestinationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{destination.location}</p>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {destination.images.map(
            (image: string | StaticImport, index: Key | null | undefined) => (
              <div
                key={index}
                className="relative h-[300px] rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${destination.name} ${String(index ?? 0 + 1)}`}
                  fill
                  className="object-cover"
                />
              </div>
            )
          )}
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-8">
          <h2 className="text-2xl font-bold mb-4">About this destination</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {destination.description}
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">
            Interested in this destination?
          </h3>
          <p className="mb-4">Contact us now to plan your trip!</p>
          <WhatsAppButton />
        </div>
      </div>
    </div>
  );
}
