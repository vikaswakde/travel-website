import { PopularPackageForm } from "@/app/components/admin/PopularPackageForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Popular Package</h1>
      <PopularPackageForm mode="create" />
    </div>
  );
}
