"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { PopularPackage } from "@/types";
import { ImageUpload } from "./ImageUpload";

export function PopularPackageForm({
  mode,
  popularPackage,
}: {
  mode: "create" | "edit";
  popularPackage?: PopularPackage;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: popularPackage?.name || "",
    description: popularPackage?.description || "",
    duration: popularPackage?.duration || "",
    price: popularPackage?.price || 0,
    image_url: popularPackage?.image_url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("popular_packages").insert([formData]);
      } else {
        await supabase
          .from("popular_packages")
          .update(formData)
          .eq("id", popularPackage?.id);
      }
      router.refresh();
      router.push("/admin/popular-packages");
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Duration
        </label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={formData.price || ""}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image
        </label>
        <ImageUpload
          images={formData.image_url ? [formData.image_url] : []}
          onImagesUpdate={(urls) =>
            setFormData({ ...formData, image_url: urls[0] || "" })
          }
          endpoint="packageImage"
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
          ? "Create Package"
          : "Update Package"}
      </button>
    </form>
  );
}
