"use client";

import { FormProvider, loginSchema } from "../FormProvider";

import Banner from "../signup/_components/Banner";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <FormProvider>
      <div className="lg:w-[1440px] m-auto relative flex">
        <Banner />
        <div className="flex gap-12 p-5 w-[50%] h-screen justify-center">
          <form className="w-[407px] mt-[246px] ml-20 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Welcome Back</h3>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
                <input
                  type="email"
                  placeholder="Enter your mail address"
                  className="h-5 flex items-center text-[14px] w-full border-none"
                  {...register("email")}
                />
              </div>
              {formState.errors.email && (
                <div className="text-[#E14942] text-[14px]">
                  {formState.errors.email.message}
                </div>
              )}
              <div className="w-full h-9 px-3 py-2 border-[1px] border-[#E4E4E7] rounded-md">
                <input
                  type="password"
                  placeholder="Password"
                  className="h-5 flex items-center text-[14px] w-full border-none"
                  {...register("password")}
                />
              </div>
              {formState.errors.password && (
                <div className="text-[#E14942] text-[14px]">
                  {formState.errors.password.message}
                </div>
              )}
            </div>
            <Button
              className={`w-full transition-none hover:bg-black hover:text-black ${
                formState.isValid && !isSubmitting
                  ? "bg-black text-white"
                  : "bg-[#d1d1d1] text-[white] hover:bg-[#d1d1d1] hover:text-white"
              }`}
              type="submit"
              disabled={!formState.isValid || isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Let's Go"}
            </Button>

            <div className="w-full flex justify-center">
              <div className="flex gap-3">
                <p className="text-[#71717A]">Don't have an account?</p>
                <Link href="/signup" className="text-[#2563EB]">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
