"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DiscountBanner as DiscountBannerType } from "@/types";

export const revalidate = 0;

async function getActiveDiscountBanner() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase
    .from("discount_banners")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching discount banner:", error);
    return null;
  }

  return data;
}

export function DiscountBanner() {
  const [banner, setBanner] = useState<DiscountBannerType | null>(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const fetchedBanner = await getActiveDiscountBanner();
      if (fetchedBanner) {
        setBanner(fetchedBanner);
      }
    };
    fetchBanner();
  }, []);

  if (!banner) return null;

  const BannerContent = () => (
    <div className="relative w-[80%] h-[13rem] md:h-[22rem] mx-auto rounded-xl overflow-hidden">
      <Image
        src={banner.image_url}
        alt={banner.title || "Discount Offer"}
        fill
        className="object-cover"
        priority
      />
    </div>
  );

  return banner.link_url ? (
    <Link href={banner.link_url}>
      <BannerContent />
    </Link>
  ) : (
    <BannerContent />
  );
}
