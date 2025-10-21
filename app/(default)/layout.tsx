"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Banner from "@/components/banner";
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
