"use client";

import React from "react";
import {Divider, Link} from "@heroui/react";
import type {IconProps} from "@iconify/react";
import {Icon} from "@iconify/react";

import { Logo } from "./logo";
import ThemeSwitch from "./theme-switch";

type SocialIconProps = Omit<IconProps, "icon">;

const socialItems = [
  // {
  //   name: "Facebook",
  //   href: "#",
  //   icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:facebook" />,
  // },
  // {
  //   name: "Instagram",
  //   href: "#",
  //   icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:instagram" />,
  // },
  {
    name: "X",
    href: "https://x.com/makecoin_cc",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fa6-brands:x-twitter" />,
  },
  {
    name: "Telegram",
    href: "#",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fa6-brands:telegram" />,
  },
  {
    name: "GitHub",
    href: "https://github.com/makecoincc",
    icon: (props: SocialIconProps) => <Icon {...props} icon="fa6-brands:github" />,
  },
  // {
  //   name: "YouTube",
  //   href: "#",
  //   icon: (props: SocialIconProps) => <Icon {...props} icon="fontisto:youtube-play" />,
  // },
];

export default function Component() {
  return (
    <footer className="flex w-full flex-col">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 md:order-2 md:items-end">
          <ThemeSwitch />
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <div className="flex items-center justify-center gap-3 md:justify-start pb-2">
            <div className="flex items-center">
              <Logo size={28} />
              <span className="ml-2 text-small font-medium">MAKE COIN</span>
            </div>
            <Divider className="h-4" orientation="vertical" />
            <div className="flex justify-center gap-x-4">
              {socialItems.map((item) => (
                <Link key={item.name} isExternal className="text-default-400" href={item.href}>
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="w-5" />
                </Link>
              ))}
            </div>
          </div>
          
          <p className="text-tiny text-default-400 text-center md:text-start">
            &copy; 2025 MakeCoin Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
