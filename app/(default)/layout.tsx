"use client";

import { useEffect } from "react";
import { supabase } from '@/utils/supabase';
import { useUserStore } from '@/store/userStore';

import AOS from "aos";
import "aos/dist/aos.css";

import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setSession, isLogin } = useUserStore()

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []);
  useEffect(() => {
    if (isLogin) {
      return;
    }
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession()
      console.log(data)
      if (data) {
        setSession(data.session)
      }
    }
    restoreSession()
  }, [isLogin])

  return (
    <>
      <main className="relative flex grow flex-col">{children}</main>

      <Footer />
    </>
  );
}
