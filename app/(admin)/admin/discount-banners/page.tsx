import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import Link from "next/link";
import Image from "next/image";

export default async function DiscountBannersPage() {
  const supabase = createClientComponentClient();
  const { data: banners } = await supabase
    .from("discount_banners")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discount Banners</h1>
        <Link
          href="/admin/discount-banners/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Banner
        </Link>
      </div>

      <div className="grid gap-6">
        {banners?.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-40 h-24 rounded-md overflow-hidden">
                <Image
                  src={banner.image_url}
                  alt={banner.title || "Discount Banner"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{banner.title}</h3>
                <p className="text-sm text-gray-500">
                  Status: {banner.active ? "Active" : "Inactive"}
                </p>
                {banner.link_url && (
                  <p className="text-sm text-gray-500">
                    Link: {banner.link_url}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/admin/discount-banners/${banner.id}`}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
