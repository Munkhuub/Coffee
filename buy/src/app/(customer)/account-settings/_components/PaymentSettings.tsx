"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { z } from "zod";
import { api } from "@/axios";
import { useForm } from "react-hook-form";
import { BankCard, useAuth } from "@/app/_providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ExpiryMonth } from "@/app/(auth)/createProfile/_components/ExpiryMonth";
import { ExpiryYear } from "@/app/(auth)/createProfile/_components/ExpiryYear";
import { bankCardSchema } from "@/app/(auth)/createProfile/_components/Payment";
import SelectCountrySettings from "./SelectCountrySettings";

type BankCardFormData = z.infer<typeof bankCardSchema>;

const PaymentSettings = () => {
  const [bankCard, setBankCard] = useState<BankCard | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const Router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<BankCardFormData>({
    resolver: zodResolver(bankCardSchema),
    mode: "onChange",
    defaultValues: {
      firstname: user?.bankCard?.firstname,
      lastname: user?.bankCard?.lastname,
      cardNumber: "",
      cvc: "",
      expiryMonth: "",
      expiryYear: "",
      country: user?.bankCard?.country,
    },
  });

  const handleComplete = async (data: BankCardFormData) => {
    setIsSubmitting(true);
    const { expiryMonth, expiryYear, ...dataWithoutExpiryDate } = data;

    try {
      const id = user?.bankCard?.id;
      const expiryDate = `${expiryMonth}/${expiryYear.slice(-2)}`;
      const response = await api.put<BankCard>(`/bankCard/${id}`, {
        ...dataWithoutExpiryDate,
        expiryDate,
      });

      setBankCard(response.data);
      console.log("Bank Card created:", response.data);
    } catch (error) {
      console.error("Error creating bank card:", error);
    }
  };

  return (
    <form
      className="text-[14px] w-[650px] flex flex-col gap-6  rounded-lg border border-[#E4E4E7] p-6"
      onSubmit={handleSubmit(handleComplete)}
    >
      <p className="text-2xl font-semibold">Payment Information</p>
      <div className="flex flex-col gap-3 w-full text-[14px]">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="country">Select Country</Label>
          <SelectCountrySettings
            onValueChange={(value) => setValue("country", value)}
            error={errors.country?.message}
            value={user?.bankCard?.country}
          />
        </div>

        <div className="flex gap-3 w-full">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstname"
              type="text"
              placeholder="Enter your name here"
              {...register("firstname")}
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">
                {errors.firstname.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              placeholder="Enter your last name here"
              {...register("lastname")}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm">
                {errors.lastname.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            {...register("cardNumber")}
          />
          {errors.cardNumber && (
            <span className="text-red-500 text-sm">
              {errors.cardNumber.message}
            </span>
          )}
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="expiryMonth">Expiry month</Label>
            <ExpiryMonth
              onValueChange={(value) => setValue("expiryMonth", value)}
              error={errors.expiryMonth?.message}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="expiryYear">Expiry year</Label>
            <ExpiryYear
              onValueChange={(value) => setValue("expiryYear", value)}
              error={errors.expiryYear?.message}
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              type="text"
              placeholder="123"
              {...register("cvc")}
            />
            {errors.cvc && (
              <span className="text-red-500 text-sm">{errors.cvc.message}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button
          className="w-[246px]"
          disabled={isSubmitting || !isValid}
          type="submit"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
};

export default PaymentSettings;
