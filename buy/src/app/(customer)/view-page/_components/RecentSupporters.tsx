import React from "react";
import HeartIcon from "./assets/HeartIcon";

const RecentSupporters = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#F4F4F5] flex flex-col gap-3">
      <h5 className="font-semibold">Recent Supporters</h5>
      <div className="h-[140px] w-full flex flex-col gap-1 justify-center items-center border border-[#F4F4F5] rounded-lg">
        <HeartIcon />
        <p className="font-semibold">Be the first one to support Jake</p>
      </div>
    </div>
  );
};

export default RecentSupporters;
