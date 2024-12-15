import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;
export default async function GalleryPage() {
  const supabase = createClientComponentClient();
  const { data: galleries, error } = await supabase
    .from("galleries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching galleries:", error);
    return (
      <p className="text-red-500">
        Failed to load galleries. Please try again later.
      </p>
    );
  }

  if (!galleries) {
    return <p className="text-gray-500">No galleries found.</p>;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#00145A] mb-8">
          Gallery
        </h1>
        {galleries.map((gallery) => (
          <div key={gallery.id} className="mb-12">
            <h2 className="text-2xl font-semibold text-[#00145A] mb-4">
              {gallery.destination_name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="relative h-72 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
