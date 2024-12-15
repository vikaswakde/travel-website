"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { Destination } from "@/types";

export function DestinationForm({
  mode,
  destination,
}: {
  mode: "create" | "edit";
  destination?: Destination;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: destination?.name || "",
    description: destination?.description || "",
    images: destination?.images || [],
    show_in_hero: destination?.show_in_hero || false,
    is_active: destination?.is_active ?? true,
    location: destination?.location || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("international").insert([formData]);
      } else if (destination?.id) {
        await supabase
          .from("international")
          .update(formData)
          .eq("id", destination.id);
      }
      router.refresh();
      router.push("/admin/international-destinations");
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
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
          endpoint="internationalDestinationImage"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="show_in_hero"
            checked={formData.show_in_hero}
            onChange={(e) =>
              setFormData({ ...formData, show_in_hero: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          <label
            htmlFor="show_in_hero"
            className="text-sm font-medium text-gray-700"
          >
            Show in Hero Section
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) =>
              setFormData({ ...formData, is_active: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          <label
            htmlFor="is_active"
            className="text-sm font-medium text-gray-700"
          >
            Active (Show in All Destinations)
          </label>
        </div>
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
