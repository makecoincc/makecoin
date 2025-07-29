"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, User } from "@heroui/react";
import Logo from "./logo";
import { useUserStore } from "@/store/userStore";

export default function Header() {
  const { user, isLogin } = useUserStore();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (isLogin) {
      if (user?.email) {
        setUserName(user.email);
      } else if (user?.user_metadata?.sub) {
        const [type, chain, address] = user.user_metadata.sub.split(':');
        setUserName(`${chain}:${address.slice(0, 4)}****${address.slice(-4)}`);
      } else {
        setUserName('no name');
      }
    }
  }, [user, isLogin]);
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Desktop sign in links */}

          <ul className="flex flex-1 items-center justify-end gap-3">
            {isLogin ? (
              <Dropdown>
                <DropdownTrigger>
                  {/* <Button variant="bordered">Open Menu</Button> */}
                  {/* <span>{userName}</span> */}
                  <User name={userName} avatarProps={{ src: "https://i.pravatar.cc/150?u=a04258114e29026702d", }} description="Product Designer" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Link Actions">
                  <DropdownItem key="home" href="/home">
                    Home
                  </DropdownItem>
                  <DropdownItem key="about" href="/about">
                    About
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <li>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
