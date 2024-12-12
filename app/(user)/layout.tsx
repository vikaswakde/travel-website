import { WhatsAppButton } from "@/app/components/WhatsAppButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Website",
  description: "Travel Destinations Booking Website",
  icons: {
    icon: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
  },
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <WhatsAppButton />
    </>
  );
}
