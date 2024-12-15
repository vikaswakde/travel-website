import { GalleryForm } from "@/app/components/admin/GalleryForm";

export default function NewGalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Create New Destination Gallery
      </h1>
      <GalleryForm mode="create" />
    </div>
  );
}
