'use client'
import AnimatedLayout from "@/app/provider/AnimatedLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen relative">
      <AnimatedLayout>
        {children}
      </AnimatedLayout>
    </main>
  );
}
