import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getHeroImages() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("hero_images")
    .select("*")
    //   .where('active', 'eq', true)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data;
}
export async function getHeroDestinations() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true)
    .eq("show_in_hero", true)
    .order("name");

  if (error) throw error;
  return data;
}

export async function getPopularInternational() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("international")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getApprovedTestimonials() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
