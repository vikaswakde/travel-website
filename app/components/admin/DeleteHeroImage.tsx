"use client";

import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function DeleteHeroImage({ id }: { id: string }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this hero image?")) {
      const { error } = await supabase
        .from("hero_images")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting hero image:", error);
        return;
      }

      router.refresh();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-900"
    >
      Delete
    </button>
  );
} 