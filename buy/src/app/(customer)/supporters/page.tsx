"use client";

import Header from "../_components/Header";
import Donation from "./_components/Donation";
import { UpdateCover } from "./_components/UpdateCover";
import { useEffect, useId, useState } from "react";
import ViewPageProfile from "./_components/ProfileSupporter";
import { api } from "@/axios";
import { Profile, useAuth } from "../../_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const [profile, setProfile] = useState<Profile>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!user && loading) {
    router.push("/signin");
    toast("Login to view page");
  }

  useEffect(() => {
    const getProfile = async () => {
      const id = user?.profile?.id;
      try {
        const response = await api.get<Profile>(`/profile/${id}`);
        setProfile(response.data);
        setBackgroundImage(response.data.backgroundImage || "");
        setSocialMediaUrl(response.data.socialMediaUrl || "");
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="mb-[187px]">
      <img
        className="relative w-full h-[319px] bg-[#F4F4F5]"
        src={profile?.backgroundImage}
      />
      <div className="flex px-20 mt-[-85px] w-full   gap-5 relative z-10">
        <ViewPageProfile />
        <Donation />
      </div>
    </div>
  );
}
