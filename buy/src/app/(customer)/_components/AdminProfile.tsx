import React, { useEffect, useState } from "react";
import { SelectDays } from "./SelectDays";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { api } from "@/axios";
import { Profile, useAuth } from "@/app/_providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedDays, setSelectedDays] = useState("30");
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast("Login to see Profile");
      router.push("/signin");
      return;
    }

    if (!user.id) {
      console.error("User object exists but has no id");
      toast("Invalid user session. Please login again.");
      router.push("/signin");
      return;
    }

    const getProfile = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<Profile>(`/profile/${user.id}`);
        setProfile(response.data);
        console.log("res", response);
        console.log("admin profile", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [user, loading, router]);

  useEffect(() => {
    if (!user?.receivedDonations) return;

    const now = new Date();

    const filteredDonations = user.receivedDonations.filter((donation) => {
      if (selectedDays === "all") return true;

      const createdAt = new Date(donation.createdAt);
      const daysDiff =
        (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);

      return daysDiff <= Number(selectedDays);
    });

    const total = filteredDonations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );

    setEarnings(total);
  }, [selectedDays, user?.receivedDonations]);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading profile...
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 border border-[#E4E4E7] p-6 rounded-lg">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            className="size-12 rounded-full bg-black"
            src={profile?.avatarImage}
          />
          <div>
            <h5 className="font-bold">{profile?.name}</h5>
            <p className="text-[14px]">buymeacoffee.com/baconpancakes1</p>
          </div>
        </div>
        <Button
          className="flex gap-2"
          onClick={() => {
            const link = `http://localhost:3000/supporters/${user?.id}`;
            navigator.clipboard.writeText(link);
            toast.success("Link copied to clipboard!");
          }}
        >
          <CopyIcon />
          <p>Share page link</p>
        </Button>
      </div>
      <div className="border-t border-[#E4E4E7] w-full my-4"></div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <h3 className="text-xl font-semibold">Earnings</h3>
          <SelectDays selectedDays={selectedDays} onChange={setSelectedDays} />
        </div>
        <p className="text-4xl font-bold">${earnings}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
