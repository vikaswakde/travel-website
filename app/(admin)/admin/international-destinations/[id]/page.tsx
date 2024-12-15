import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DestinationForm } from "@/app/components/admin/InternationalDestinationForm";
import { notFound } from "next/navigation";

export default async function EditDestinationPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClientComponentClient();
  const { data: destination } = await supabase
    .from("international")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!destination) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Destination</h1>
      <DestinationForm mode="edit" destination={destination} />
    </div>
  );
}
