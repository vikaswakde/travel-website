"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { Gallery } from "@/types";

export const revalidate = 0;
export function GalleryForm({
  mode,
  destination,
}: {
  mode: "create" | "edit";
  destination?: Gallery;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination_name: destination?.destination_name || "",
    images: destination?.images || [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("galleries").insert([formData]);
      } else if (destination?.id) {
        await supabase
          .from("galleries")
          .update(formData)
          .eq("id", destination.id);
      }
      router.refresh();
      router.push("/admin/gallery-upload");
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
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.destination_name}
          onChange={(e) => setFormData({ ...formData, destination_name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        <ImageUpload
          images={formData.images}
          onImagesUpdate={(urls) => setFormData({ ...formData, images: urls })}
          endpoint="galleryImage"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : mode === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
