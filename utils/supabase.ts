import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getDestinations() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) throw error;
  return data;
}

export async function getTestimonials() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) throw error;
  return data;
}
