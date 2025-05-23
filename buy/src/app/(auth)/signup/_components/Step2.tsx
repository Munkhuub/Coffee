"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormContext } from "../../FormProvider";

export const Step2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    prevStep,
    emailPasswordForm,
    updateFormValues,
    formValues,
    handleSubmit,
    isSubmitting,
  } = useFormContext();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState,
  } = emailPasswordForm;

  const onSubmit = handleFormSubmit(async (data) => {
    updateFormValues(data);
    await handleSubmit();
  });

  return (
    <div className="flex gap-12 p-5 w-[50%] h-screen items-center justify-center">
      <form className="w-[407px] flex flex-col gap-6" onSubmit={onSubmit}>
        <Button variant="outline" size="icon" onClick={prevStep} type="button">
          <ChevronLeft />
        </Button>

        <div>
          <h3 className="text-2xl font-semibold">Complete your account</h3>
          <p className="text-[#71717A]">
            Add your email and create a strong password
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md bg-gray-50">
            <div className="h-5 flex items-center text-[14px] w-full">
              <span className="text-gray-500">Username:</span>
              <span className="ml-2">{formValues.username}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("email")}
            />
          </div>
          {formState.errors.email && (
            <div className="text-[#E14942] text-[14px]">
              {formState.errors.email.message}
            </div>
          )}
        </div>

        <div className="passwordBox flex flex-col gap-4">
          <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-5 flex items-center text-[14px] w-full border-none"
              {...register("password")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="h-5 flex items-center text-[14px] w-full border-none"
                {...register("confirmPassword")}
              />
            </div>
            {formState.errors.password && (
              <div className="text-[#E14942] text-[14px]">
                {formState.errors.password.message}
              </div>
            )}
            {formState.errors.confirmPassword && (
              <div className="text-[#E14942] text-[14px]">
                {formState.errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div className="flex h-[16px] items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              onChange={(e) => setShowPassword(e.target.checked)}
              className="size-[16px]"
            />
            <label
              htmlFor="showPassword"
              className="text-sm text-[#71717A] cursor-pointer"
            >
              Show password
            </label>
          </div>
        </div>

        <Button
          className={`w-full transition-none hover:bg-black hover:text-white ${
            formState.isValid
              ? "bg-black text-white"
              : "bg-[#d1d1d1] text-black hover:bg-[#d1d1d1] hover:text-black"
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
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
