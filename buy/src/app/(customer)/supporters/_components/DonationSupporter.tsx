"use client";
import { CheckCircle, CoffeeIcon, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/axios";
import { Profile, useAuth } from "@/app/_providers/AuthProvider";
import { toast } from "sonner";

const formSchema = z.object({
  socialURLOrBuyMeACoffee: z.string().min(2, {
    message: "URL must be at least 2 characters.",
  }),
  specialMessage: z.string().min(2, {
    message: "Special message must be at least 2 characters.",
  }),
});

type DonationSupporterProps = {
  profile?: Profile;
};

type FormValues = z.infer<typeof formSchema>;

const DonationSupporter = ({ profile }: DonationSupporterProps) => {
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const { user } = useAuth();

  const amounts = [1, 3, 5, 10];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      socialURLOrBuyMeACoffee: "",
      specialMessage: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await api.post("/donation", {
        ...values,
        amount: selectedAmount,
        donorId: user?.id,
        recipientId: profile?.userId,
      });
      console.log("Donation successful");
      setSubmitStatus("success");

      setTimeout(() => {
        form.reset();
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Donation error", error);
      setSubmitStatus("error");
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-[50%] bg-white p-6 rounded-lg border border-[#F4F4F5] flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h5 className="text-2xl font-semibold">Buy {profile?.name} a Coffee</h5>
        <div className="flex flex-col gap-2">
          <p>Select amount:</p>
          <div className="flex gap-3">
            {amounts.map((amount) => (
              <Button
                className={`flex gap-2 w-[72px] ${
                  selectedAmount === amount
                    ? "bg-black text-white"
                    : "bg-[#F4F4F5] text-black hover:bg-[#e0e0e0]"
                }`}
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                type="button"
              >
                <CoffeeIcon className="size-4" />${amount}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="socialURLOrBuyMeACoffee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter BuyMeCoffee or social account URL:</FormLabel>
                <FormControl>
                  <Input placeholder="buymeacoffee.com/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special message:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please write your message here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={`w-full ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : submitStatus === "success"
                ? "bg-green-600 text-white"
                : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : submitStatus === "success" ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Success!
              </>
            ) : (
              "Support"
            )}
          </Button>
        </form>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md mt-4">
            <p className="text-sm text-green-800">
              Donation sent successfully! Thank you for your support.
            </p>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
            <p className="text-sm text-red-800">
              Something went wrong. Please try again.
            </p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default DonationSupporter;
