import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { PopularPackageForm } from "@/app/components/admin/PopularPackageForm";
import { notFound } from "next/navigation";

export default async function EditPopularPackagePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: popularPackage } = await supabase
    .from("popular_packages")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!popularPackage) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Popular Package</h1>
      <PopularPackageForm mode="edit" popularPackage={popularPackage} />
    </div>
  );
}
