import { ProfileType } from "@/app/(auth)/createProfile/_components/Profile";
import { UpdateImage } from "@/app/(auth)/createProfile/_components/UpdateImage";
import { useFormContext } from "@/app/(auth)/FormProvider";
import { useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  about: z
    .string()
    .max(500, "About must be less than 500 characters")
    .optional(),
  socialMediaUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  avatarImage: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const { updateFormValues } = useFormContext();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      about: "",
      socialMediaUrl: "",
      avatarImage: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const id = user?.profile?.id;

      if (!user?.profile?.id) {
        console.error("User not found:", user);
        throw new Error("Please log in to create a profile");
      }

      console.log("Creating profile for user ID:", id);

      const response = await api.put<ProfileType>(`/profile/${id}`, {
        ...data,
      });

      setProfile(response.data);
      console.log("Profile updated:", response.data);
    } catch (err) {
      console.error("Error creating profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="text-[14px] w-[650px] flex flex-col gap-6 ">
      <p className="text-2xl font-semibold">My Profile</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 rounded-lg border border-[#E4E4E7] p-6"
      >
        <h4 className="font-bold">Personal Info</h4>
        <div className="flex flex-col gap-3">
          <p>Add photo</p>
          <UpdateImage
            onChange={(url) =>
              setValue("avatarImage", url, { shouldValidate: true })
            }
            defaultValue={user?.profile?.avatarImage}
          />
        </div>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name here"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              placeholder="Write about yourself here"
              className={`h-[131px] w-full ${
                errors.about ? "border-red-500" : ""
              }`}
              {...register("about")}
            />
            {errors.about && (
              <p className="text-red-500 text-sm">{errors.about.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="socialMediaUrl">Social media URL</Label>
            <Input
              id="socialMediaUrl"
              type="url"
              placeholder="https://"
              {...register("socialMediaUrl")}
              className={errors.socialMediaUrl ? "border-red-500" : ""}
            />
            {errors.socialMediaUrl && (
              <p className="text-red-500 text-sm">
                {errors.socialMediaUrl.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid || !user?.id}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
