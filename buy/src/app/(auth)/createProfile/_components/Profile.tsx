"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CameraIcon } from "lucide-react";
import React from "react";
import { useFormContext } from "../../FormProvider";

const Profile = () => {
  const { nextStep, updateFormValues } = useFormContext();

  const handleContinue = () => {
    updateFormValues({
      username: "name",
    });

    nextStep();
  };

  return (
    <div>
      <div className="text-[14px] w-[510px] flex flex-col gap-6">
        <p className="text-2xl font-semibold">Complete your profile page</p>
        <div className="flex flex-col gap-3">
          <p>Add photo</p>
          <div className="size-40 rounded-full border border-dashed border-[#E4E4E7] flex items-center justify-center">
            <CameraIcon className="size-7 text-[#E4E4E7]" />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Enter your name here" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              placeholder="Write about yourself here"
              className="h-[131px] w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="url">Social media URL</Label>
            <Input id="url" type="url" placeholder="https://" />
          </div>
        </div>
        <Button className="w-[246px] ml-auto" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Profile;
