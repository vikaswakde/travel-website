"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

type Testimonial = {
  id: string;
  name: string;
  tour: string;
  rating: number;
  comment: string;
  image?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function AdminTestimonialsPage() {
  const supabase = createClientComponentClient();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTestimonial = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error("Error removing testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="flex items-start gap-4">
      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xl font-semibold">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{testimonial.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{testimonial.tour}</p>
        <div className="flex text-yellow-400 my-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
        <p className="text-gray-700">{testimonial.comment}</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(testimonial.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Testimonials</h1>

      {/* Pending Testimonials Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
        <div className="grid gap-4">
          {testimonials
            .filter((t) => t.status === "pending")
            .map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <TestimonialCard testimonial={testimonial} />
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() =>
                        handleStatusUpdate(testimonial.id, "approved")
                      }
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                      disabled={loading}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(testimonial.id, "rejected")
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                      disabled={loading}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {testimonials.filter((t) => t.status === "pending").length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No pending reviews to show
            </p>
          )}
        </div>
      </div>

      {/* Approved Testimonials Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Approved Reviews</h2>
        <div className="grid gap-4">
          {testimonials
            .filter((t) => t.status === "approved")
            .map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <TestimonialCard testimonial={testimonial} />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleRemoveTestimonial(testimonial.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          {testimonials.filter((t) => t.status === "approved").length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No approved reviews to show
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
