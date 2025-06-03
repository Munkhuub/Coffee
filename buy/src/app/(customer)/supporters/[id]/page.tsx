"use client";

import { useEffect, useState } from "react";
import { api } from "@/axios";
import { Profile, useAuth } from "../../../_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DonationSupporter from "../_components/DonationSupporter";
import ProfileSupporter from "../_components/ProfileSupporter";

export default function Home() {
  const [profile, setProfile] = useState<Profile>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && loading) {
      router.push("/signin");
      toast("Login to view page");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const getProfile = async () => {
      setIsLoading(true);
      const userId = user?.id;
      try {
        const response = await api.get<Profile>(`/profile/${userId}`);
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
  }, [user]);

  if (isLoading) {
    return <div>Loading profile...</div>;
  }
  return (
    <div className="mb-[187px]">
      <img
        className="relative w-full h-[319px] bg-[#F4F4F5]"
        src={profile?.backgroundImage}
      />
      <div className="flex px-20 mt-[-85px] w-full   gap-5 relative z-10">
        <ProfileSupporter profile={profile} />
        <DonationSupporter profile={profile} />
      </div>
    </div>
  );
}
