"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-dvh w-full flex-col">
      <Header />
      <main className="relative flex grow flex-col">{children}</main>
      <Footer />
    </div>
  );
}
