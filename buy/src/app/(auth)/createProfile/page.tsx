"use client";

import React from "react";
import { FormProvider, useFormContext } from "../FormProvider";
import Profile from "./_components/Profile";
import Payment from "./_components/Payment";

const Stepper = () => {
  const { step } = useFormContext();

  return (
    <div className="absolute top-6 right-1/2 transform -translate-x-1/2 flex items-center gap-2">
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

const Content = () => {
  const { step } = useFormContext();

  return (
    <div className="lg:w-[1440px] m-auto h-screen relative flex flex-col items-center justify-center">
      <Stepper />
      {step === 0 && <Profile />}
      {step === 1 && <Payment />}
    </div>
  );
};

export default function Page() {
  return (
    <FormProvider>
      <Content />
    </FormProvider>
  );
}
