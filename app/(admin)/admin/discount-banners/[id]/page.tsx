import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { notFound } from "next/navigation";
import { DiscountBannerForm } from "@/app/components/admin/DiscountBannerForm";

export default async function EditDiscountBanner({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClientComponentClient();
  const { data: destination } = await supabase
    .from("discount_banner")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!destination) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Destination</h1>
      <DiscountBannerForm mode="edit" banner={destination} />
    </div>
  );
}
