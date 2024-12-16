"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2Icon } from "lucide-react";

export default function AdminDashboard() {
  const supabase = createClientComponentClient();
  const [data, setData] = useState({
    totalInternational: 0,
    totalTestimonials: 0,
    totalRegional: 0, // Added regional data
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: internationalData, error: internationalError } =
          await supabase.from("international").select("*");
        if (internationalError) throw internationalError;

        const { data: testimonialsData, error: testimonialsError } =
          await supabase.from("testimonials").select("*");
        if (testimonialsError) throw testimonialsError;

        const { data: regionalData, error: regionalError } = await supabase
          .from("destinations")
          .select("*"); // Fetching regional data
        if (regionalError) throw regionalError;

        setData({
          totalInternational: internationalData.length,
          totalTestimonials: testimonialsData.length,
          totalRegional: regionalData.length, // Setting regional data count
        });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2Icon className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total International</h2>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalInternational}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Domestic</h2>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalRegional}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Testimonials</h2>
          <p className="text-3xl font-bold text-blue-600">
            {data.totalTestimonials}
          </p>
        </div>
      </div>
    </div>
  );
}
