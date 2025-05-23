"use client";

import { Step1 } from "./_components/Step1";
import { Step2 } from "./_components/Step2";
import { FormProvider, useFormContext } from "../FormProvider";
import Banner from "./_components/Banner";

const FormStepper = () => {
  const { step } = useFormContext();

  return (
    <div className="absolute top-6 right-1/4 transform -translate-x-1/2 flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          step === 0 ? "bg-black" : "bg-gray-300"
        }`}
      ></div>
      <div
        className={`w-3 h-3 rounded-full ${
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
