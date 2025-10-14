"use client";
import Header from "@/components/Header";
import Footer from "@/components/BasicFooter";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Header />
      <main className="relative flex grow flex-col">{children}</main>
      <Footer />
    </>
  );
}
