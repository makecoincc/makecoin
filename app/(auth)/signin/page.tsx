"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/Logo";

export default function SignIn() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  const router = useRouter();
  const onBack = () => {
    router.push("/");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center pt-24 relative">
      <Button
        className="absolute top-4 left-4 bg-default-50 text-small text-default-500 font-medium shadow-lg"
        radius="full"
        variant="flat"
        onPress={onBack}
      >
        <Icon icon="solar:arrow-left-outline" width={18} />
        Home
      </Button>
      <div className="flex flex-col items-center pb-6">
        <Logo size={48} className="pb-2" />
        <p className="text-xl font-medium">MAKE COIN</p>
        <p className="text-small text-default-500 w-[500px] text-center">Logging in is optional—unless you want to keep record of actions like token creation, transfers, and other activities.</p>
      </div>
      <div className="rounded-large bg-content1 shadow-small mt-2 flex w-full max-w-sm flex-col gap-4 px-8 py-6">
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="text-default-400 pointer-events-none text-2xl"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
            variant="bordered"
          />
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Checkbox name="remember" size="sm">
              Remember me
            </Checkbox>
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Log In
          </Button>
        </Form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
              startContent={<Icon className="text-default-500" icon="pajamas:twitter" width={20} />}
              variant="bordered"
          >
              Sign in with X
          </Button>
          <Button
              startContent={<Icon className="text-default-500" icon="token-branded:ethereum" width={26} />}
              variant="bordered"
          >
              Sign in with Ethereum
          </Button>
          <Button
              startContent={<Icon className="text-default-500" icon="token-branded:solana" width={24} />}
              variant="bordered"
          >
              Sign in with Ethereum
          </Button>
        </div>
        <p className="text-small text-center">
          Need to create an account?&nbsp;
          <Link href="/signup" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
