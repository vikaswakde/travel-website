"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Testimonial } from "@/types";
import { ImageUpload } from "./ImageUpload";

type Props = {
  testimonial?: Testimonial;
  mode: "create" | "edit";
};

export function TestimonialForm({ testimonial, mode }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    comment: testimonial?.comment || "",
    rating: testimonial?.rating || 5,
    image: testimonial?.image || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        await supabase.from("testimonials").insert([formData]);
      } else {
        await supabase
          .from("testimonials")
          .update(formData)
          .eq("id", testimonial?.id);
      }
      router.refresh();
      router.push("/admin/testimonials");
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
          Comment
        </label>
        <textarea
          value={formData.comment}
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <select
          value={formData.rating}
          onChange={(e) =>
            setFormData({ ...formData, rating: Number(e.target.value) })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Image
        </label>
        {/* // For testimonials */}
        <ImageUpload
          images={formData.image ? [formData.image] : []}
          onImagesUpdate={(urls) =>
            setFormData({ ...formData, image: urls[0] || "" })
          }
          endpoint="testimonialImage"
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
          ? "Create Testimonial"
          : "Update Testimonial"}
      </button>
    </form>
  );
}
