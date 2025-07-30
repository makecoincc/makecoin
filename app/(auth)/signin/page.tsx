// export const metadata = {
//   title: "Sign In - Open PRO",
//   description: "Page description",
// };
'use client'
import Link from "next/link";
import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase";
import { useUserStore } from "@/store/userStore";
import { useRouter } from 'next/navigation';
import { addToast, Button } from "@heroui/react";

export default function SignIn() {
  const router = useRouter();
  const { setSession } = useUserStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
  const [solanaLoading, setSolanaLoading] = useState<boolean>(false);

  useEffect(() => {
    const scriptId = "turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      script.onload = () => {
        console.log('turnstile loaded')
        if ((window as any).turnstile) {
          (window as any).turnstile.render("#my-turnstile", {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
            size: "flexible",
            theme: 'dark',
            callback: (token: string) => {
              setToken(token);
            },
          });
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const signInWithPassword = async () => {
    setPasswordLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: token
      }
    });
    setPasswordLoading(false);
    if (error) {
      addToast({
        title: "Sign in failed",
        description: error.message,
        color: "danger"
      });
      return;
    }
    setSession(data.session);
    router.push('/');
  };

  const signInWithSolana = async (wallet: any) => {
    setSolanaLoading(true);
    const { data, error } = await supabase.auth.signInWithWeb3({
      chain: 'solana',
      statement: 'I accept the Terms of Service at https://makecoin.cc/tos',
      wallet,
      options: {
        captchaToken: token
      }
    });
    setSolanaLoading(false);
    if (error) {
      addToast({
        title: "Sign in failed",
        description: error.message,
        color: "danger"
      });
      return;
    }
    console.log(data)
    setSession(data.session);
    router.push('/');
  }

  const submit = async (type: string) => {
    if (!token) {
      addToast({
        title: "Please verify you are a human",
        description: "",
        color: "danger"
      });
      return;
    }
    if (type === 'email') {
      await signInWithPassword();

    } else if (type === 'solana') {
      const wallet = (window as any)?.solana || (window as any)?.braveSolana
      if (!wallet) {
        addToast({
          title: "No Solana wallet found",
          description: "",
          color: "danger"
        });
        return;
      }
      await signInWithSolana(wallet);
    }
  }
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div id="my-turnstile" className="w-full"></div>
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-input w-full"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <label
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-input w-full"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <Button radius="sm" isLoading={passwordLoading} disabled={solanaLoading} onPress={() => submit('email')} className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">Sign in</Button>
              <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-linear-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-linear-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              <Button isLoading={solanaLoading} disabled={passwordLoading} radius="sm" onPress={() => submit('solana')} className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Sign In with Solana
              </Button>
            </div>
          </form>
          {/* Bottom link */}
          <div className="mt-6 text-center text-sm text-indigo-200/65">
            Don't you have an account?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
