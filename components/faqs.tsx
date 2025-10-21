"use client";

import React from "react";
import {Accordion, AccordionItem, Button} from "@heroui/react";
import {Icon} from "@iconify/react";

const texts = [
  {
    title: "What is Acme?",
    content:
      "Acme is a design system for building performant, accessible and beautiful web experiences.",
  },
  {
    title: "How can I apply to the Open Source Discount?",
    content:
      "The Open Source Discount is available for everyone who is building an open source project. You can apply to the discount by sending an email to support@acme.com",
  },
  {
    title: "Can I use Acme for my freelance projects?",
    content:
      "Yes, you can use Acme for your freelance projects. You can purchase the Freelancer License from our website.",
  },
  {
    title: "What is your refund policy?",
    content: "We do not provide refunds. However, we can help you with any issues you may have.",
  },
  {
    title: "Can I cancel my subscription?",
    content: "Yes, you can cancel and renew your subscription at any time.",
  },
  {
    title: "How do I switch from quarterly to yearly subscription?",
    content:
      "You can switch from quarterly to yearly subscription by canceling your quarterly subscription and purchasing a yearly subscription.",
  },
  {
    title: "Do you have monthly payment plans?",
    content:
      "No, we do not provide monthly payment plans. You can purchase a quarterly or yearly subscription.",
  },
  {
    title: "Do you have discounts for students?",
    content:
      "Yes, we provide a 50% discount for students. You can apply to the discount by sending an email to support@acme.com",
  },
  {
    title: "Do you have discounts for startups?",
    content:
      "Yes, we provide a 50% discount for startups. You can apply to the discount by sending an email to support@acme.com",
  },
  {
    title: "How often do you release updates?",
    content: "We release updates every two weeks.",
  },
];
export default function Faqs() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-32 md:px-6 lg:px-8 lg:py-40">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
        <h2 className="from-foreground to-foreground-600 w-full max-w-3xl bg-linear-to-br bg-clip-text px-2 text-center text-3xl font-bold tracking-tight text-transparent md:text-5xl">
          <span className="inline-block md:hidden">FAQs</span>
          <span className="hidden md:inline-block">Frequently asked questions</span>
        </h2>
        <div>
          <Button
            disableAnimation
            className="from-foreground to-foreground-600 text-background bg-linear-to-br font-medium"
            endContent={<Icon icon="lucide:chevron-right" width={24} />}
            size="lg"
            variant="shadow"
          >
            Contact Us
          </Button>
        </div>
        <Accordion
          fullWidth
          keepContentMounted
          itemClasses={{
            base: "px-0 md:px-2 md:px-6",
            title: "font-medium",
            trigger: "py-6 flex-row-reverse",
            content: "pt-0 pb-6 text-base text-default-500",
            indicator: "rotate-0 data-[open=true]:-rotate-45",
          }}
          items={texts}
          selectionMode="multiple"
        >
          {texts.map((item, i) => (
            <AccordionItem
              key={i}
              indicator={<Icon className="text-secondary" icon="lucide:plus" width={24} />}
              title={item.title}
            >
              {item.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
