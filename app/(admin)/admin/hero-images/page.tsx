import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import { DeleteHeroImage } from "@/app/components/admin/DeleteHeroImage";

export const revalidate = 0;
export default async function HeroImagesPage() {
  const supabase = createClientComponentClient();
  const { data: heroImages } = await supabase
    .from("hero_images")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hero Images</h1>
        <Link
          href="/admin/hero-images/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Hero Image
        </Link>
      </div>

      <div className="grid gap-6">
        {heroImages?.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={image.image_url}
                alt={image.title}
                width={120}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-semibold">{image.title}</h3>
                <p className="text-sm text-gray-500">{image.subtitle}</p>
                <p className="text-sm text-gray-500">
                  Order: {image.display_order} | Status:{" "}
                  {image.active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/hero-images/${image.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
              </Link>
              <DeleteHeroImage id={image.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
