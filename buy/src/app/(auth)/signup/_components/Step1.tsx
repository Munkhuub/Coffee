"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormContext } from "../../FormProvider";

export const Step1 = () => {
  const { nextStep, usernameForm, updateFormValues } = useFormContext();

  const { register, handleSubmit, formState } = usernameForm;

  const onSubmit = handleSubmit((data) => {
    updateFormValues(data);
    nextStep();
  });

  return (
    <div className="flex gap-12 p-5 w-[50%] h-screen justify-center items-center">
      <form className="w-[407px] flex flex-col gap-6" onSubmit={onSubmit}>
        <Link href="/">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
        <div>
          <h3 className="text-2xl font-semibold">Create your account</h3>
          <p className="text-[#71717A] text-[14px]">
            Choose a username for your page
          </p>
        </div>
        <div>
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type="text"
              placeholder="Enter username here"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("username")}
            />
          </div>
          {formState.errors.username && (
            <div className="text-[#E14942] text-[14px]">
              {formState.errors.username.message}
            </div>
          )}
        </div>

        <Button
          className={`w-full transition-none hover:bg-black hover:text-white ${
            formState.isValid
              ? "bg-black text-white"
              : "bg-[#d1d1d1] text-black hover:bg-[#d1d1d1] hover:text-black"
          }`}
          type="submit"
        >
          Continue
        </Button>
        <div className="w-full flex justify-center">
          <div className="flex gap-3">
            <p className="text-[#71717A]">Already have an account?</p>
            <Link href="/login" className="text-[#2563EB]">
              Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
