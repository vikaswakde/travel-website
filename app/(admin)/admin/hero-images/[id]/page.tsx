import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { HeroImageForm } from "@/app/components/admin/HeroImageForm";

export default async function EditHeroImagePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: heroImage } = await supabase
    .from("hero_images")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!heroImage) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Hero Image</h1>
      <HeroImageForm mode="edit" heroImage={heroImage} />
    </div>
  );
} 