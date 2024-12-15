"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { HeroImage } from "@/types";
import { ImageUpload } from "./ImageUpload";

export function HeroImageForm({
  mode,
  heroImage,
}: {
  mode: "create" | "edit";
  heroImage?: HeroImage;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: heroImage?.title || "",
    subtitle: heroImage?.subtitle || "",
    image_url: heroImage?.image_url || "",
    active: heroImage?.active ?? true,
    display_order: heroImage?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("hero_images").insert([formData]);
      } else {
        await supabase
          .from("hero_images")
          .update(formData)
          .eq("id", heroImage?.id);
      }
      router.refresh();
      router.push("/admin/hero-images");
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
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Subtitle
        </label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({ ...formData, subtitle: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Display Order
        </label>
        <input
          type="number"
          value={formData.display_order || ""}
          onChange={(e) =>
            setFormData({ ...formData, display_order: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      {/* <div>
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
      </div> */}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image
        </label>
        <ImageUpload
          images={formData.image_url ? [formData.image_url] : []}
          onImagesUpdate={(urls) =>
            setFormData({ ...formData, image_url: urls[0] || "" })
          }
          endpoint="heroImage"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : mode === "create"
          ? "Create Hero Image"
          : "Update Hero Image"}
      </button>
    </form>
  );
}
