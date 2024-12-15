import Link from "next/link";
import Image from "next/image";
import { Gallery } from "@/types";
import axios from "axios";
import { DeleteGallery } from "@/app/components/admin/DeleteGallery";

export const revalidate = 0;
export default async function GalleryUploadPage() {
  try {
    const res = await axios.get<Gallery[]>(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/galleries`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const gallery: Gallery[] = res.data; // Axios automatically parses JSON
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gallery Destinations</h1>
          <Link
            href="/admin/gallery-upload/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Gallery Destination
          </Link>
        </div>

        <div className="grid gap-6">
          {gallery?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.destination_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{item.destination_name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  href={`/admin/gallery-upload/${item.id}`}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </Link>
                <DeleteGallery id={item.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Gallery:", error);
    return <div>Error loading Gallery.</div>;
  }
}
