import Link from "next/link";
import Image from "next/image";
import { DeleteDestination } from "@/app/components/admin/DeleteDestination";
import { Destination } from "@/types";
import axios from "axios";

export default async function DestinationsPage() {
  try {
    const res = await axios.get<Destination[]>(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/destinations`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const destinations: Destination[] = res.data; // Axios automatically parses JSON
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Destinations</h1>
          <Link
            href="/admin/destinations/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Destination
          </Link>
        </div>

        <div className="grid gap-6">
          {destinations?.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                  <Image
                    src={destination.images[0]}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{destination.name}</h3>
                  <div className="flex gap-2 mt-2">
                    {destination.show_in_hero && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        Hero Section
                      </span>
                    )}
                    {destination.is_active ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  href={`/admin/destinations/${destination.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </Link>
                <DeleteDestination id={destination.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return <div>Error loading destinations.</div>;
  }
}
