"use client"; // Marking this component as a client component

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Image from "next/image";
import { DeleteDiscount } from "@/app/components/admin/DeleteDiscount";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch"; // Importing Switch from shadcn/ui
import { DiscountBanner } from "@/types";

// export const revalidate = 0;
export default function DiscountBannersPage() {
  const supabase = createClientComponentClient();
  const [banners, setBanners] = useState<DiscountBanner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("discount_banners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching banners:", error);
      setError("Failed to load banners. Please try again later.");
    } else {
      setBanners(data);
    }
    setLoading(false);
  };

  const toggleActiveState = async (id: string, currentState: boolean) => {
    const newState = !currentState;
    const { error } = await supabase
      .from("discount_banners")
      .update({ active: newState })
      .eq("id", id);

    if (error) {
      console.error("Error updating banner state:", error);
    } else {
      fetchBanners(); // Refresh banners after update
    }
  };

  useEffect(() => {
    fetchBanners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading banners...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
        {banners.map((banner) => (
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
              <Switch
                checked={banner.active ?? false}
                onCheckedChange={() =>
                  toggleActiveState(banner.id, banner.active ?? false)
                }
                className="bg-gray-200"
              />
              <DeleteDiscount id={banner.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
