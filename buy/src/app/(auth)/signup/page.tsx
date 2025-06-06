"use client";

import { Step1 } from "./_components/Step1";
import { Step2 } from "./_components/Step2";
import { FormProvider, useFormContext } from "../FormProvider";
import Banner from "./_components/Banner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FormStepper = () => {
  const { step } = useFormContext();

  return (
    <div className="absolute top-50 right-1/4 transform -translate-x-1/2 flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${
          step === 0 ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`w-2 h-2 rounded-full ${
          step === 1 ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
    </div>
  );
};

const MultiStepForm = () => {
  const { step } = useFormContext();

  return (
    <div className="lg:w-[1440px] m-auto relative flex">
      <FormStepper />
      <Banner />
      <Link href="/signin">
        <Button variant="secondary" className="absolute top-8 right-20">
          Log In
        </Button>
      </Link>
      {step === 0 && <Step1 />}
      {step === 1 && <Step2 />}
    </div>
  );
};

export default function SignUp() {
  return (
    <FormProvider>
      <MultiStepForm />
    </FormProvider>
  );
}
