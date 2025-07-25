"use client";
// export const metadata = {
//   title: "Sign In - Open PRO",
//   description: "Page description",
// };

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/store/userStore";
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const { setSession, setUser } = useUserStore();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginType, setLoginType] = useState<string>('email'); // email solana
  const [isSolanaAvailable, setIsSolanaAvailable] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSolanaAvailable(!!window?.solana);
    }
  }, []);

  useEffect(() => {
    const scriptId = "turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (loginType === "solana" && window.turnstile) {
      window.turnstile.render("#my-turnstile", {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
        size: "flexible",
        callback: (token: string) => {
          console.log("收到 token:", token);
          setToken(token);
          // 存 token，用于提交表单或 Supabase 验证
        },
      });
    }
  }, [loginType, isSolanaAvailable]);

  const loginWithSolana = async () => {
    
    if (!token) {
      return;
    }
    const wallet = window?.solana;
    // 1. 连接钱包
    if (wallet) {
      await wallet.connect();
      // 2. 检查是否支持 signMessage 和 publicKey
      if (!wallet.signMessage || !wallet.publicKey?.toBase58) {
        throw new Error("钱包不兼容 Supabase 登录要求");
      }
    } else {
      console.error("钱包对象不存在，可能未安装 Phantom 或未注入 window.solana");
    }

    const { data, error } = await supabase.auth.signInWithWeb3({
      chain: 'solana',
      statement: 'I accept the Terms of Service at https://example.com/tos',
      wallet: window?.solana,
      options: {
        captchaToken: token
      }
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data)
    setSession(data.session);
    setUser(data.user);
    router.push('/');
  };

  const loginWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log(data);
    setSession(data.session);
    setUser(data.user);
    router.push('/');
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginType === 'solana') {
      await loginWithSolana();
    } else if (loginType === 'email') {
      await loginWithEmail();
    }
  }

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Welcome back
            </h1>
          </div>
          <div className="flex justify-center pb-12 max-md:hidden md:pb-10">
            <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40 p-1">
              {/* Button #1 */}
              <button
                className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${loginType === "email" ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                aria-pressed={loginType === "email"}
                onClick={() => setLoginType("email")}
              >
                <svg
                  className={`fill-current ${loginType === "email" ? "text-indigo-500" : "text-gray-600"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                >
                  <path d="M11.92 6.851c.044-.027.09-.05.137-.07.481-.275.758-.68.908-1.256.126-.55.169-.81.357-2.058.075-.498.144-.91.217-1.264-4.122.75-7.087 2.984-9.12 6.284a18.087 18.087 0 0 0-1.985 4.585 17.07 17.07 0 0 0-.354 1.506c-.05.265-.076.448-.086.535a1 1 0 0 1-1.988-.226c.056-.49.209-1.312.502-2.357a20.063 20.063 0 0 1 2.208-5.09C5.31 3.226 9.306.494 14.913.004a1 1 0 0 1 .954 1.494c-.237.414-.375.993-.567 2.267-.197 1.306-.244 1.586-.392 2.235-.285 1.094-.789 1.853-1.552 2.363-.748 3.816-3.976 5.06-8.515 4.326a1 1 0 0 1 .318-1.974c2.954.477 4.918.025 5.808-1.556-.628.085-1.335.121-2.127.121a1 1 0 1 1 0-2c1.458 0 2.434-.116 3.08-.429Z"></path>
                </svg>
                <span>Sign with Email</span>
              </button>
              {/* Button #2 */}
              {isSolanaAvailable && (
                <button
                  className={`flex h-8 flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${loginType === "solana" ? "relative bg-gradient-to-b from-gray-900 via-gray-800/60 to-gray-900 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.indigo.500/0),theme(colors.indigo.500/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]" : "opacity-65 transition-opacity hover:opacity-90"}`}
                  aria-pressed={loginType === "solana"}
                  onClick={() => setLoginType("solana")}
                >
                  <svg
                    className={`fill-current ${loginType === "solana" ? "text-indigo-500" : "text-gray-600"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                  >
                    <g stroke="none" strokeWidth="1" >
                      <g id="path" transform="translate(0.78, 0.41)" >
                        <polygon id="Path" points="12.7694146 3.22102748 0 3.22102748 3.23058542 1.13188807e-15 16 1.13188807e-15"></polygon>
                        <polyline id="Path" points="12.7694146 13.2504978 0 13.2504978 3.23058542 10.0310633 16 10.0310633"></polyline>
                        <polyline id="Path" points="3.23058542 8.23576264 16 8.23576264 12.7694146 5.01473517 0 5.01473517"></polyline>
                      </g>
                    </g>
                  </svg>
                  <span>Sign with Solana</span>
                </button>
              )}
            </div>
          </div>
          {/* Contact form */}
          <form className="mx-auto max-w-[400px]" onSubmit={login}>
            {loginType === 'email' && (
              <>
                <div className="space-y-5">
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
                  <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                    Sign in
                  </button>
                </div>
              </>
            )}
            {loginType === 'solana' && (
              <>
                <div className="block flex-row">
                  <div id="my-turnstile" className="w-full"></div>
                </div>
                <div className="mt-6 space-y-5">
                  <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]" >
                    Sign in with Solana
                  </button>
                </div>
              </>
            )}
            {/* <div className="mt-6 space-y-5">
              <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                Sign in
              </button>
              <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                or
              </div>
              
            </div> */}
          </form>
          {/* Bottom link */}
          {loginType === 'email' && (
            <div className="mt-6 text-center text-sm text-indigo-200/65">
              {`Don't you have an account?`}
              <Link className="font-medium text-indigo-500" href="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
