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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div>Loading profile...</div>;
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
          <SelectDays />
        </div>
        <p className="text-4xl font-bold">$450</p>
      </div>
    </div>
  );
};

export default AdminProfile;
