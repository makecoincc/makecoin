"use client";

import React from "react";
import { Button, Input, Checkbox, Link, Divider, Form } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

import { Logo } from "@/components/logo";

export default function SignUp() {
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
        <p className="text-xl font-medium">Create an account</p>
        <p className="text-small text-default-500">to continue to MakeCoin</p>
      </div>
      <div className="rounded-large bg-content1 shadow-small mt-2 flex w-full max-w-sm flex-col gap-4 px-8 py-6">
        <Form className="flex flex-col gap-3" validationBehavior="native" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Full Name"
            name="name"
            placeholder="Enter your name"
            type="text"
            variant="bordered"
          />
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
          <div className="flex w-full items-center gap-2 py-2">
            <Checkbox name="terms" size="sm">
              I agree to the&nbsp;
              <Link className="relative z-1" href="#" size="sm">
                Terms
              </Link>
              &nbsp; and&nbsp;
              <Link className="relative z-1" href="#" size="sm">
                Privacy Policy
              </Link>
            </Checkbox>
          </div>
          <Button className="w-full" color="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        <div className="flex items-center gap-4">
          <Divider className="flex-1" />
          <p className="text-tiny text-default-500 shrink-0">OR</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
          >
            Continue with Google
          </Button>
          <Button
            startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-small text-center">
          Already have an account?&nbsp;
          <Link href="/signin" size="sm">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
