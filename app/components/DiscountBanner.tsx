import Image from "next/image";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getActiveDiscountBanner() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("discount_banners")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return data;
}

export async function DiscountBanner() {
  const banner = await getActiveDiscountBanner();

  if (!banner) return null;

  const BannerContent = () => (
    <div className="relative w-[80%] h-[20rem] mx-auto rounded-xl overflow-hidden">
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
