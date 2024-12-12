"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/hero-images", label: "Hero Images" },
    { href: "/admin/discount-banners", label: "Discount Banner" },
    { href: "/admin/destinations", label: "Destinations" },
    { href: "/admin/testimonials", label: "Testimonials" },
    { href: "/admin/popular-packages", label: "Popular Packages" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="text-xl font-bold mb-8">Admin Panel</div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded ${
              pathname === item.href ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          Sign Out
        </button>
      </nav>
    </div>
  );
}
