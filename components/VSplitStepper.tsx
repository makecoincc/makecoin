"use client";

import React from "react";
import {Progress} from "@heroui/react";

import VerticalSteps from "./VerticalSteps";

export default function VSplitStepper({
  steps,
  currentStep,
  setCurrentStep,
  clickable = false,
  title,
  description
}: {
  steps: { title: string; description: string }[];
  currentStep: number;
  setCurrentStep?: (step: number) => void;
  clickable?: boolean;
  title: string;
  description?: string;
}) {
  return (
    <section className="max-w-sm">
      <h1 className="mb-2 text-xl font-medium" id="getting-started">
        {title}
      </h1>
      { description && (
        <p className="text-small text-default-500 mb-5">
            {description}
        </p>
      )}
      <Progress
        classNames={{
          base: "px-0.5 mb-5",
          label: "text-small",
          value: "text-small text-default-400",
        }}
        label="Steps"
        maxValue={steps.length - 1}
        minValue={0}
        showValueLabel={true}
        size="md"
        value={currentStep}
        valueLabel={`${currentStep + 1} of ${steps.length}`}
      />
      <VerticalSteps
        hideProgressBars
        currentStep={currentStep}
        stepClassName="border border-default-200 dark:border-default-50 aria-[current]:bg-default-100 dark:aria-[current]:bg-default-50"
        steps={steps}
        onStepChange={setCurrentStep}
        clickable={clickable}
      />
    </section>
  );
}
