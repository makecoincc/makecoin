"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex w-full flex-col">
      <Banner />
      <Header />
      <main className="relative flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
