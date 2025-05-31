import { useAuth } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import React from "react";
import RecentSupporters from "./RecentSupporters";
import Link from "next/link";

const ViewPageProfile = () => {
  const { user } = useAuth();
  return (
    <div className="w-[50%] flex flex-col gap-5">
      <div className="bg-white p-6 rounded-lg border border-[#F4F4F5]">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <img
              className="size-12 rounded-full bg-black"
              src={user?.profile?.avatarImage}
            />
            <h5 className="font-bold">{user?.profile?.name}</h5>
          </div>
          <Link href={"/account-settings"}>
            <Button className="flex gap-2 bg-[#F4F4F5] text-black  hover:bg-[#e0e0e0]">
              Edit page
            </Button>
          </Link>
        </div>
        <div className="border-t border-[#E4E4E7] w-full my-4"></div>
        <h5 className="font-semibold">About Jake</h5>
        <p className="text-[14px]">{user?.profile?.about}</p>
      </div>
      <div className="bg-white p-6 rounded-lg border border-[#F4F4F5]">
        <h5 className="font-semibold">Social media URL</h5>
        <p className="text-[14px]">https://buymeacoffee.com/spacerulz44</p>
      </div>
      <RecentSupporters />
    </div>
  );
};

export default ViewPageProfile;
