"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useFormContext } from "../../FormProvider";
import SelectCountry from "./SelectCountry";
import { ExpiryMonth } from "./ExpiryMonth";
import { ExpiryYear } from "./ExpiryYear";

const Payment = () => {
  const { prevStep, handleSubmit, isSubmitting } = useFormContext();

  const onSubmit = async () => {
    await handleSubmit();
  };

  return (
    <div className="text-[14px] w-[510px] flex flex-col gap-6">
      <p className="text-2xl font-semibold">Payment Information</p>
      <div className="flex flex-col gap-3 w-full text-[14px]">
        <div className="w-full flex flex-col gap-2">
          <Label htmlFor="country">Select Country</Label>
          <SelectCountry />
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="cardName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your name here"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="cardName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name here"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="expiry">Expiry</Label>
            <ExpiryMonth />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="expiry">Expiry</Label>
            <ExpiryYear />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" type="text" placeholder="123" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <Button
          variant="outline"
          className="w-[120px]"
          onClick={prevStep}
          disabled={isSubmitting}
        >
          Back
        </Button>
        <Button
          className="w-[246px]"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Complete"}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
