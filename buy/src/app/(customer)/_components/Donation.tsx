"use client";
import { CoffeeIcon } from "lucide-react";
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

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(1);

  const amounts = [1, 3, 5, 10];
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log({ ...values, selectedAmount });
  };

  return (
    <div className="w-[50%] bg-white p-6 rounded-lg border border-[#F4F4F5] flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h5 className="text-2xl font-semibold">Buy Jake a Coffee</h5>
        <div className="flex flex-col gap-2">
          <p>Select amount:</p>
          <div className="flex gap-3">
            {amounts.map((amount) => (
              <Button
                className="flex gap-2 bg-[#F4F4F5] w-[72px] text-black hover:bg-[#e0e0e0]"
                key={amount}
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
            name="username"
            render={({ field }) => (
              <FormItem className="gap-5">
                <FormLabel>Enter BuyMeCoffee or social acount URL:</FormLabel>
                <FormControl>
                  <Input placeholder="buymeacoffee.com/" {...field} />
                </FormControl>
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
          <Button type="submit" className="w-full">
            Support
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Donation;
