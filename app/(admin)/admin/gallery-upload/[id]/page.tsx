import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { GalleryForm } from "@/app/components/admin/GalleryForm";

export default async function EditGalleryPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClientComponentClient();
  const { data: destination } = await supabase
    .from("galleries")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!destination) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Gallery Destination</h1>
      <GalleryForm mode="edit" destination={destination} />
    </div>
  );
}
