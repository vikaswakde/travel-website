"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImageUpload } from "./ImageUpload";

type DiscountBanner = {
  id: string;
  image_url: string;
  title: string;
  link_url: string;
  active: boolean;
};

export function DiscountBannerForm({
  mode,
  banner,
}: {
  mode: "create" | "edit";
  banner?: DiscountBanner;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image_url: banner?.image_url || "",
    title: banner?.title || "",
    link_url: banner?.link_url || "",
    active: banner?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("discount_banners").insert([formData]);
      } else {
        await supabase
          .from("discount_banners")
          .update(formData)
          .eq("id", banner?.id);
      }
      router.refresh();
      router.push("/admin/discount-banners");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Banner Image
        </label>
        <ImageUpload
          images={formData.image_url ? [formData.image_url] : []}
          onImagesUpdate={(urls) =>
            setFormData({ ...formData, image_url: urls[0] || "" })
          }
          endpoint="bannerImage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Banner Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Link URL (Optional)
        </label>
        <input
          type="url"
          value={formData.link_url}
          onChange={(e) =>
            setFormData({ ...formData, link_url: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) =>
              setFormData({ ...formData, active: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">Active</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Banner"
          : "Update Banner"}
      </button>
    </form>
  );
}
