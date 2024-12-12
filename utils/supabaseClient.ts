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
