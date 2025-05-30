"use client";

import Header from "../_components/Header";
import Donation from "./_components/Donation";
import { UpdateCover } from "./_components/UpdateCover";
import { useEffect, useState } from "react";
import ViewPageProfile from "./_components/ViewPageProfile";
import { api } from "@/axios";
import { Profile } from "../../_providers/AuthProvider";

export default function Home() {
  const [profile, setProfile] = useState<Profile>();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [socialMediaUrl, setSocialMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await api.get<Profile>("/profile");
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

  const handleCoverChange = async (url: string) => {
    setBackgroundImage(url);

    try {
      const response = await api.post<Profile>("/profile", {
        backgroundImage: url,
      });
      setProfile(response.data);
      console.log("Background image saved successfully");
    } catch (error) {
      console.error("Failed to save background image:", error);
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-64">
          <p>Loading profile...</p>
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
