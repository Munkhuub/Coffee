import React, { useEffect, useState } from "react";
import { SelectAmount } from "./SelectAmount";
import { Donation, useAuth } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { formatDistanceToNow } from "date-fns";

const Transactions = () => {
  const [supporters, setSupporters] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [amountFilter, setAmountFilter] = useState<number[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      console.log("No user or userId:", user);
      return;
    }

    setIsLoading(true);
    const getDonations = async () => {
      try {
        const { data } = await api.get<{ donations: Donation[] }>(
          `/donation/${user.id}`
        );
        setSupporters(data.donations);
      } catch (error) {
        console.error("Failed to fetch supporters", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDonations();
  }, [user?.id]);

  const filteredSupporters =
    amountFilter && amountFilter.length > 0
      ? supporters.filter((d) => amountFilter.includes(d.amount))
      : supporters;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h5 className="font-semibold">Recent transactions</h5>
        <SelectAmount
          onChange={(value: number[]) => setAmountFilter(value)}
          value={amountFilter ?? []}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : supporters.length === 0 ? (
        <p>No donations yet.</p>
      ) : (
        filteredSupporters.map((supporter) => (
          <div
            key={supporter.id}
            className="border border-[#E4E4E7] p-6 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <img
                  src={supporter.donor?.profile?.avatarImage || "/default.jpg"}
                  className="size-12 rounded-full bg-black"
                  alt="Avatar"
                />
                <div>
                  <h5 className="font-bold">
                    {supporter.donor?.profile?.name || "Anonymous"}
                  </h5>
                  <p className="text-[14px] text-gray-600">
                    {supporter.socialURLOrBuyMeACoffee ||
                      supporter.donor?.profile?.socialMediaUrl ||
                      "No social link"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  + ${supporter.amount}
                </p>
                <p className="text-[#71717A] text-xs">
                  {supporter.createdAt
                    ? formatDistanceToNow(new Date(supporter.createdAt), {
                        addSuffix: true,
                      })
                    : "Just now"}
                </p>
              </div>
            </div>
            {supporter.specialMessage && (
              <p className="mt-3 text-sm">{supporter.specialMessage}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Transactions;
