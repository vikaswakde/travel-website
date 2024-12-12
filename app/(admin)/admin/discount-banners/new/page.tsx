import { DiscountBannerForm } from "@/app/components/admin/DiscountBannerForm";

export default function NewHeroImagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Hero Image</h1>
      <DiscountBannerForm mode="create" />
    </div>
  );
} 