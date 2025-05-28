import React from "react";
import { SelectAmount } from "./SelectAmount";

const Transactions = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <h5 className="font-semibold">Recent transactions</h5>
        <SelectAmount />
      </div>
      <div>
        <div className="flex gap-3">
          <img className="size-12 rounded-full bg-black" />
          <div>
            <h5 className="font-bold">Jake</h5>
            <p className="text-[14px]">instagram.com/welesley</p>
          </div>
        </div>
        <div>
          <p className="font-bold">+ $1</p>
          <p className="text-[#71717A] text-xs">10 hours ago</p>
        </div>
      </div>
      <p>
        Thank you for being so awesome everyday! You always manage to brighten
        up my day when I’m feeling down. Although $1 isn’t that much money it’s
        all I can contribute at the moment{" "}
      </p>
    </div>
  );
};

export default Transactions;
