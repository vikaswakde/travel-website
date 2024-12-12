import { Navbar } from "@/app/components/Navbar";
import { WhatsAppButton } from "@/app/components/WhatsAppButton";
import Head from "next/head";
import Footer from "../components/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMt23jFh2bP3D7mV7W7T8cM7yU1lVZ5L5r5G3"
          crossOrigin="anonymous"
        />
      </Head>
      <Navbar />
      <main className="">{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
