"use client";

import Header from "../_components/Header";
import Donation from "./_components/Donation";
import { UpdateCover } from "./_components/UpdateCover";
import { useEffect, useId, useState } from "react";
import ViewPageProfile from "./_components/ViewPageProfile";
import { api } from "@/axios";
import { Profile, useAuth } from "../../_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const [profile, setProfile] = useState<Profile>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!user && loading) {
    router.push("/signin");
    toast("Login to view page");
  }

  useEffect(() => {
    const getProfile = async () => {
      if (!user?.id) return;

      setIsLoading(true);
      const id = user?.id;
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

    if (user && !loading) {
      getProfile();
    }
  }, [user, loading]);

  const handleCoverChange = async (url: string) => {
    setBackgroundImage(url);

    if (!user?.profile?.id) {
      console.error("No user profile ID available");
      return;
    }

    try {
      const response = await api.put<Profile>(`/profile/${user.profile.id}`, {
        backgroundImage: url,
      });

      setProfile(response.data);

      // Ensure backgroundImage state matches the saved value
      setBackgroundImage(response.data.backgroundImage || "");

      console.log("Background image saved successfully");
    } catch (error) {
      console.error("Failed to save background image:", error);
      // Revert the UI change if API call fails
      setBackgroundImage(profile?.backgroundImage || "");
    }
  };

  if (!user) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <UpdateCover
        defaultValue={backgroundImage}
        onChange={handleCoverChange}
      />
      <div className="flex px-20 mt-[-85px] w-full  gap-5 relative z-10">
        <ViewPageProfile />
        <Donation />
      </div>
    </div>
  );
}
