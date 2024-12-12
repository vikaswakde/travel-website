"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImageUpload } from "./admin/ImageUpload";

export function TestimonialSubmissionForm() {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("testimonials").insert([
        {
          ...formData,
          status: "pending",
        },
      ]);

      if (error) throw error;
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-6">
        <div className="max-w-md mx-auto bg-emerald-50 rounded-lg p-6 shadow border border-emerald-100">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">
            Thank You!
          </h3>
          <p className="text-emerald-700">
            Your testimonial is pending review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-8 shadow-md lg:shadow-lg" id="testimonial_sub">
      <div className="container mx-auto px-8 max-w-4xl bg-gradient-to-br from-indigo-200 via-neutral-200 to-purple-300 py-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Share Your Experience
          </h1>
          <p className="text-gray-600 mt-2">
            Help us improve and inspire others
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-purple-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-purple-100 px-3 py-2 bg-white/50 focus:border-indigo-500 focus:ring-1"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">
                Rating
              </label>
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-purple-100 px-3 py-2 bg-white/50 focus:border-indigo-500 focus:ring-1"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-indigo-900 mb-1">
                Your Experience
              </label>
              <textarea
                required
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                rows={4}
                className="w-full rounded-lg border border-purple-100 px-3 py-2 bg-white/50 focus:border-indigo-500 focus:ring-1"
                placeholder="Tell us about your experience..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-indigo-900 mb-1">
                Your Photo (Optional)
              </label>
              <div className="bg-white/50 p-3 rounded-lg border border-purple-100">
                <ImageUpload
                  images={formData.image ? [formData.image] : []}
                  onImagesUpdate={(urls) =>
                    setFormData({ ...formData, image: urls[0] || "" })
                  }
                  endpoint="testimonialImage"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Testimonial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
