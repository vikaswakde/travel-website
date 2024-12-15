"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";

type Props = {
  images: string[];
  onImagesUpdate: (urls: string[]) => void;
  endpoint:
    | "destinationImage"
    | "internationalDestinationImage"
    | "testimonialImage"
    | "packageImage"
    | "heroImage"
    | "bannerImage"
    | "galleryImage";
};

export function ImageUpload({ images, onImagesUpdate, endpoint }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative group">
            <Image
              src={url}
              alt={`Upload ${index + 1}`}
              width={200}
              height={200}
              className="rounded-lg object-cover w-full h-48"
            />
            <button
              onClick={() => {
                const newImages = images.filter((_, i) => i !== index);
                onImagesUpdate(newImages);
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const urls = res.map((r) => r.url);
          onImagesUpdate([...images, ...urls]);
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
          alert("Upload failed: " + error.message);
        }}
      />
    </div>
  );
}
