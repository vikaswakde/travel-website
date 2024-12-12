import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { DeleteDestination } from "@/app/components/admin/DeleteDestination";

export default async function DestinationsPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .order("name");

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
}
