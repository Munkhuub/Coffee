import React, { useEffect, useState } from "react";
import HeartIcon from "./assets/HeartIcon";
import { api } from "@/axios";
import { Donation, useAuth } from "@/app/_providers/AuthProvider";

const RecentSupporters = () => {
  const [supporters, setSupporters] = useState<Donation[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const getDonations = async () => {
      try {
        const { data } = await api.get<{ donations: Donation[] }>(
          `/donation/${user.id}`
        );
        setSupporters(data.donations || []);
      } catch (error) {
        console.error("Failed to fetch supporters", error);
      }
    };

    getDonations();
  }, [user?.id]);

  return (
    <div className="bg-white p-6 rounded-lg border border-[#F4F4F5] flex flex-col gap-3">
      <h5 className="font-semibold">Recent Supporters</h5>

      {supporters.length > 0 ? (
        <ul className="max-h-[140px] overflow-y-auto flex flex-col gap-1">
          {supporters.map((donation) => (
            <li key={donation.id} className="flex items-center gap-2">
              <HeartIcon />
              <span>{donation.specialMessage || "Anonymous supporter"}</span>
              <span className="ml-auto font-semibold">${donation.amount}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-[140px] w-full flex flex-col gap-1 justify-center items-center border border-[#F4F4F5] rounded-lg">
          <HeartIcon />
          <p className="font-semibold">Be the first one to support Jake</p>
        </div>
      )}
    </div>
  );
};

export default RecentSupporters;
