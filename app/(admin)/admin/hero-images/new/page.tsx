import { HeroImageForm } from "@/app/components/admin/HeroImageForm";

export default function NewHeroImagePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Hero Image</h1>
      <HeroImageForm mode="create" />
    </div>
  );
} 